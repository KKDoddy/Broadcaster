import express from 'express';
import isLoggedIn from '../middlewares/isloggedin';
import { checker, commentChecker, locationChecker } from '../helpers/recordValidator';
import getUuid from '../middlewares/uuidGenerator';
import upload from '../middlewares/fileHandler';
import controller from '../controllers/redflagController';


const router = express.Router();

router.get("/:id", isLoggedIn, controller.findOne );
router.get("" ,isLoggedIn , controller.getAll );
router.post('', isLoggedIn, getUuid, upload.fields([{ name: 'images', maxCount: 1 }, { name: 'videos', maxCount: 1 }]), checker, controller.createRedFlag);
router.patch("/:id/location",isLoggedIn, locationChecker , controller.patchLocation);
router.patch("/:id/comment",isLoggedIn, commentChecker, controller.patchComment);
router.delete("/:id", isLoggedIn, controller.deleteRedFlag);

export default router;
