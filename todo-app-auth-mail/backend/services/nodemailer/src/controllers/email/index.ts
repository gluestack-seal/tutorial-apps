import Send from "./send";

class Email {
  public send(req: Request, res: Response): Promise<void> {
    return Send.handle(req, res);
  }

  // ... 
}

export default new Email();