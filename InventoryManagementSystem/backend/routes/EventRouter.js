import express from 'express';
import EventController from "../controllers/EventsController.js";

const router = express.Router();

router.get('/', EventController.getEvents);


export default router;
