import express from 'express';
import isLoggedIn from '../middleware/isloggedin';
import { checker, commentChecker, locationChecker } from '../helpers/recordValidator';
import getUuid from '../middleware/uuidGenerator';
import upload from '../middleware/fileHandler';
import controller from '../controllers/redflagController';


const router = express.Router();

router.get('', isLoggedIn, controller.getAll);
router.post('', isLoggedIn, getUuid, upload.fields([{ name: 'images', maxCount: 1 }, { name: 'videos', maxCount: 1 }]), checker, controller.createRedFlag);

export default router;
