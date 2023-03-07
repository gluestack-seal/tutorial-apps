import Helpers from "../helpers";
import Locals from "../../../providers/locals";
import Common from "../../commons";
import Mutations from "../graphql/mutations";

function randomName(fileName: string) {
  const extension = fileName.split(".").pop();
  const newFilename = (+new Date()).toString(36) + "." + extension;
  return newFilename;
}

class Upload {
  public static async handle(req: any, res: any): Promise<void> {
    const { is_public } = req.body;

    const client = Helpers.minioClient();

    // Get the file from the request
    const file = req.file;

    // Use the minioClient to upload the file to Minio

    const fileName = randomName(file.originalname);

    client.putObject(
      Locals.config().minioConfig.buckets[is_public === "true" ? "public" : "private"],
      fileName,
      file.buffer,
      async function (err: any, etag: any) {
        if (err) {
          // Handle the error
          return res.status(500).send(err);
        }
        const { data, errors } = await Common.GQLRequest({
          variables: {
            name: fileName,
            original_name: file.originalname,
            size: file.size,
            mime_type: file.mimetype,
            etag: etag.etag,
            path: fileName,
            is_public: is_public || false,
          },
          query: Mutations.InsertFile,
        });

        if (!data || !data.data || !data.data.insert_files_one) {
          const error =
            errors ||
            (data.errors && data.errors[0].message) ||
            "Something went wrong!";
          return Common.Response(res, false, error, null);
        }
        return res.send(data.data.insert_files_one);
      },
    );
  }
}

export default Upload;
