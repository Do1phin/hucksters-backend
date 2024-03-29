import express from 'express';
import photoCtrl from '../controllers/photo.controller.js';

const router = express.Router();

router.route('/photos/create')
    .post(photoCtrl.createPhoto);

router.route('/members/albums/photos')
    .post(photoCtrl.readPhoto);

// router.route('/photos/update')
//     .post(photoCtrl.updatePhoto);

router.route('/photos/additional_photos/operation')
    .post(photoCtrl.updateFavoritePhotoCount);

// router.route('/photos/delete')
//     .post(photoCtrl.deletePhoto);

export default router;
