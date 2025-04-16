import { Router } from "express";
import ArticleController from "../controllers/articleController";

const router = Router();

router.get("/articles", ArticleController.getArticles);
router.post("/articles", async (req, res) => {
  await ArticleController.createArticle(req, res);
});
router.delete("/articles/:id", async (req, res) => {
  await ArticleController.deleteArticle(req, res);
});
export default router;
