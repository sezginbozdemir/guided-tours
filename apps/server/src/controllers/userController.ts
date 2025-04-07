import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ error: `Failed to fetch users: ${error.message}` });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { email, name } = req.body;

    try {
      const newUser = await prisma.user.create({ data: { email, name } });
      res.status(201).json(newUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed toc reate user: ${error.message}` });
    }
  }
}

export default UserController;
