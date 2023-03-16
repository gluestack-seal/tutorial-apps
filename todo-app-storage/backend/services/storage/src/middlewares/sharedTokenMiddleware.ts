import Locals from "../providers/locals";

export default function sharedTokenMiddleware(req: any, res: any, next: any) {
  // Check for a shared token in the request headers
  const sharedToken = req.headers["x-shared-token"];

  if (!sharedToken || sharedToken !== Locals.config().middleware.shared.secret) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  next();
}