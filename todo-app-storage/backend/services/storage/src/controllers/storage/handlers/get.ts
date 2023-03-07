import Helpers from "../helpers";
import Locals from "../../../providers/locals";
import Common from "../../commons";
import Queries from "../graphql/queries";

class Get {
  public static async handle(req: any, res: any): Promise<void> {
    const { id } = req.params;
    try {
      // graphql query
      const { data } = await Common.GQLRequest({
        variables: { id: parseInt(id) },
        query: Queries.FileById,
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
      const file = data?.data?.files[0];
      const client = Helpers.minioClient();

      client.presignedUrl(
        "GET",
        Locals.config().minioConfig.buckets[file.is_public ? "public" : "private"],
        file.path,
        parseInt(Locals.config().minioConfig.tokenTimeout),
        function (err: any, presignedUrl: string) {
          if (err) return res.json({"url": null});
          const url = new URL(presignedUrl);
          let replacedUrl = `${Locals.config().appBaseUrl}/backend/${Locals.config().appId}/file${url.pathname}${url.search}`
          replacedUrl = replacedUrl.replace("localhost", Locals.config().minioConfig.adminEndPoint)
          replacedUrl = replacedUrl.replace("127.0.0.1", Locals.config().minioConfig.adminEndPoint)
          return res.json({"url": replacedUrl});
        },
      );
    } catch (error: any) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default Get;
