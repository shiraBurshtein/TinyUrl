import express from "express";
import LinksController from "../Controllers/LinkController.js";
const LinkRouter = express.Router();

LinkRouter.get("/", LinksController.getList);
LinkRouter.get('/redirect/:id',LinksController.redirect);
LinkRouter.get('/:id/clicks', LinksController.getClickStatistics);
LinkRouter.get("/:id", LinksController.getById);
LinkRouter.post("/", LinksController.add);
LinkRouter.put("/:id", LinksController.update);
LinkRouter.delete("/:id", LinksController.delete);

export default LinkRouter;
