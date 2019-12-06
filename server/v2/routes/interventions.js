import express from 'express';
import isLoggedIn from '../middleware/isloggedin';
import { checker, commentChecker, locationChecker,statusChecker } from '../helpers/recordValidator';
import getUuid from '../middleware/uuidGenerator';
import upload from '../middleware/fileHandler';
import controller from '../controllers/interventionController';
import checkAdmin from '../middleware/checkAdmin';


const router = express.Router();

router.get('/:id', isLoggedIn, controller.findOne);
router.get('', isLoggedIn, controller.getAll);
router.post('', isLoggedIn, getUuid, upload.fields([{ name: 'images', maxCount: 1 }, { name: 'videos', maxCount: 1 }]), checker, controller.createIntervention);
router.patch('/:id/comment', isLoggedIn, commentChecker, controller.patchComment);
router.patch('/:id/location', isLoggedIn, locationChecker, controller.patchLocation);
router.patch('/:id/status', checkAdmin, statusChecker, controller.patchStatus);
router.delete('/:id', isLoggedIn, controller.deleteIntervention);

export default router;
