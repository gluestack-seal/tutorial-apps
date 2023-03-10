class Commons {
  /**
   * Server response
   */
  public Response(res: any, success: boolean, message: string | undefined, data: any) {
    res.json({ success, message, data });
  }
}

export default new Commons();
