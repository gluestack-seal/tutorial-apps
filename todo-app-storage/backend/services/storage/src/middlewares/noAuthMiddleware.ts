export default function noAuthMiddleware(req: any, res: any, next: any) {
  // Do nothing, allow all requests
  next();
}
