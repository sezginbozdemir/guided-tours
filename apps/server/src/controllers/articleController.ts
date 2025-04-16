import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ArticleController {
  static async getArticles(req: Request, res: Response) {
    try {
      const articles = await prisma.article.findMany({});

      res.json(articles);
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ error: `Failed to fetch articles: ${error.message}` });
    }
  }
  static async createArticle(req: Request, res: Response) {
    const { sections } = req.body;
    if (!sections) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const newArticle = await prisma.article.create({
        data: {
          sections,
        },
      });
      res.status(201).json(newArticle);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to create article: ${error.message}` });
    }
  }
  static async deleteArticle(req: Request, res: Response) {
    const { id } = req.params;
    const numericId = Number(id);
    try {
      const article = await prisma.article.findUnique({
        where: { id: numericId },
      });

      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      await prisma.article.delete({
        where: { id: numericId },
      });

      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to delete article: ${error.message}` });
    }
  }
}

export default ArticleController;
