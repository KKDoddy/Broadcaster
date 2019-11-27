import express from 'express';
import isLoggedIn from '../middlewares/isloggedin';
import { checker } from '../helpers/recordValidator';
import getUuid from '../middlewares/uuidGenerator';
import upload from '../middlewares/fileHandler';
import controller from '../controllers/redflagController';


const router = express.Router();

router.get("/:id", isLoggedIn, controller.findOne );
router.get("" ,isLoggedIn , controller.getAll );
router.post('', isLoggedIn, getUuid, upload.fields([{ name: 'images', maxCount: 1 }, { name: 'videos', maxCount: 1 }]), checker, controller.createRedFlag);

export default router;
