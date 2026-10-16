import { Request, Response } from "express";

export default class UserController {
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    // Implement logic to retrieve all users from the service
    return res.status(200).json({ message: "All users retrieved" });
  }
}
