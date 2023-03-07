import Helpers from "../helpers";
import Locals from "../../../providers/locals";
import Common from "../../commons";
import Queries from "../graphql/queries";

class File {
  
  public static async handle(req: any, res: any): Promise<void> {
    return res.json({error: "deprecated api"})
    const { path } = req.params;
    try {
      // graphql query
      const { data } = await Common.GQLRequest({
        variables: { path: path },
        query: Queries.FileByPath,
      });

      // error handling
      if (
        !data ||
        !data.data ||
        !data.data.files ||
        data.data.files.length === 0
      ) {
        return res.json({});
      }
      const client = Helpers.minioClient();

      const file = data?.data?.files[0];

      if (!file.is_public) {
        return res.json({});
      }

      client.presignedUrl(
        "GET",
        Locals.config().minioConfig.buckets[file.is_public ? "public" : "private"],
        file.path,
        parseInt(Locals.config().minioConfig.tokenTimeout),
        function (err: any, presignedUrl: string) {
          if (err) return console.log(err);
          return res.redirect(presignedUrl);
        },
      );
      /*
      var arr: any = [];
      client.getObject(
        Locals.config().minioConfig.buckets[file.is_public ? "public" : "private"],
        path,
        function (err: any, dataStream: any) {
          if (err) {
            return 
          }
          dataStream.on("data", function (chunk: any) {
            arr.push(chunk);
          });
          dataStream.on("end", function () {
            var buf = Buffer.concat(arr);
            var fileContents = Buffer.from(buf.toString("base64"), "base64");
            res.set('Content-disposition', 'attachment; inline=' + data.data.files[0].original_name);
            res.set('Content-Type', data.data.files[0].mime_type);
            res.end(fileContents)
          });
          dataStream.on("error", function (err: any) {
            //
          });
        },
      );
      */
    } catch (error: any) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default File;
