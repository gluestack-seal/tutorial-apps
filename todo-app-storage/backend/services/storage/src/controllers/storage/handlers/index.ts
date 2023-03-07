import Upload from "./upload";
import Get from "./get";
import File from "./file";

class Authentication {
  public upload(req: any, res: any): any {
    return Upload.handle(req, res);
  }
  public get(req: any, res: any): any {
    return Get.handle(req, res);
  }
  public file(req: any, res: any): any {
    return File.handle(req, res);
  }
}

export default new Authentication();
