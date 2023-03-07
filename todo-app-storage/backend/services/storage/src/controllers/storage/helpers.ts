const Minio = require("minio");
import Locals from "../../providers/locals";

class Helpers {
  /**
   * Create minio client
   */
  public minioClient() {
    return new Minio.Client({
      endPoint: Locals.config().minioConfig.adminEndPoint,
      port: parseInt(Locals.config().minioConfig.port),
      useSSL: Locals.config().minioConfig.useSSL === "true",
      accessKey: Locals.config().minioConfig.accessKey,
      secretKey: Locals.config().minioConfig.secretKey,
    });
  }
}

export default new Helpers();
