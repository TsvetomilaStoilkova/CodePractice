import express from 'express';
import BookstoreController from '../controllers/BookstoreController.js';

const router = express.Router();

router.post('/add', BookstoreController.addBookstore);
router.get('/', BookstoreController.getBookstores);


export default router;