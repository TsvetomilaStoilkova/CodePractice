import express from "express";
import BookController from "../controllers/BookController.js";

const router = express.Router();

router.post("/add", BookController.addBook);
router.get("/all", BookController.getAllBooks); 

router.put("/scrapping/:name", BookController.scrappingBook);
router.put("/sell/:bookName", BookController.sellBook);

export default router;
