import { Router } from "express";
import { createPrismaClient } from "../service/prisma.service";
import { UrlController } from "../controller/url.controller";
import { UrlService } from "../service/url.service";
import { UrlRepository } from "../respository/url.repository";
import { authenticateOptional } from "../middleware/optional";

const router = Router();

const db = createPrismaClient();

const urlRepository = new UrlRepository(db);
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

router.post("/url",authenticateOptional(false), (req,res) => {
    urlController.create(req,res);
});

router.get("/urls", authenticateOptional(true),(req,res) => urlController.listMyUrls(req,res));
router.put("/urls/:id", authenticateOptional(true),(req,res) => urlController.updateMyUrl(req,res));
router.delete("/urls/:id", authenticateOptional(true),(req,res) => urlController.deleteUrl(req,res));

router.get("/:shortCode", async(req,res) => {
    urlController.redirect(req,res);
});

export default router;