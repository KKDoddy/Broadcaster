/* eslint-disable object-shorthand */
import { validationResult } from 'express-validator';
import Redflag from '../models/red-flag';

class redflagController {
  static getAll(req, res) {
    const owned = Redflag.filter((record) => record.createdBy === req.uId);
    res.status(200).json({ staus: 200, data: owned });
  }

  static findOne(req, res) {
    const red = Redflag.find((rf) => rf.id === req.params.id);
    if (red) {
      res.status(200).json({ status: 200, data: red });
    } else {
      res.status(404).json({ status: 404, error: 'record not found' });
    }
  }

  static createRedFlag(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const {
        title, comment, location, status,
      } = req.body;
      if (req.files) {
        /* istanbul ignore else */
        if (req.files.images && req.files.videos) {
          Redflag.push({
            id: req.id,
            createdOn: new Date(),
            createdBy: req.uId,
            title: title,
            type: 'red-flag',
            comment: comment,
            location: location,
            status: status,
            images: req.files.images[0].path,
            videos: req.files.videos[0].path,
          });
          res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[Redflag.length - 1].id,
                message: 'Created red-flag record',
              },
            ],
          });
        } else if (req.files.images) {
          Redflag.push({
            id: req.id,
            createdOn: new Date(),
            createdBy: req.uId,
            title: title,
            type: 'red-flag',
            comment: comment,
            location: location,
            status: status,
            images: req.files.images[0].path,
            videos: '',
          });
          res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[Redflag.length - 1].id,
                message: 'Created red-flag record',
              },
            ],
          });
        } else if (req.files.videos) {
          Redflag.push({
            id: req.id,
            createdOn: new Date(),
            createdBy: req.uId,
            title: title,
            type: 'red-flag',
            comment: comment,
            location: location,
            status: status,
            images: '',
            videos: req.files.videos[0].path,
          });
          res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[Redflag.length - 1].id,
                message: 'Created red-flag record',
              },
            ],
          });
        }
      } else {
        Redflag.push({
          id: req.id,
          createdOn: new Date(),
          createdBy: req.uId,
          title: title,
          type: 'red-flag',
          comment: comment,
          location: location,
          status: status,
          images: '',
          videos: '',
        });
        res.status(201).json({
          status: 201,
          data: [
            {
              id: Redflag[Redflag.length - 1].id,
              message: 'Created red-flag record',
            },
          ],
        });
      }
    }
  }

  static patchComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const red = Redflag.find((rf) => rf.id === req.params.id);
      if (red) {
        if (red.createdBy === req.uId) {
          const index = Redflag.findIndex((el) => el.id === red.id);
          Redflag[index].comment = req.body.comment;
          return res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[index].id,
                message: "Updated red-flag record's comment",
              },
            ],
          });
        }
        return res.status(401).json({
          status: 401,
          error: "not authorized to modify the record's comment",
        });
      }
      return res.status(404).json({ status: 404, error: 'record not found' });
    }
  }

  static patchLocation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const red = Redflag.find((rf) => rf.id === req.params.id);
      if (red) {
        if (red.createdBy === req.uId) {
          const index = Redflag.findIndex((el) => el.id === red.id);
          Redflag[index].location = req.body.location;
          return res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[index].id,
                message: "Updated red-flag record's location",
              },
            ],
          });
        }
        return res.status(401).json({
          status: 401,
          error: "not authorized to modify the record's location",
        });
      }
      return res.status(404).json({ status: 404, error: 'record not found' });
    }
  }

  static deleteRedFlag(req, res) {
    const red = Redflag.find((record) => record.id === req.params.id);
    if (red) {
      if (red.createdBy === req.uId) {
        const index = Redflag.findIndex((el) => el.id === red.id);
        Redflag.splice(index, 1);
        return res.status(200).json({
          status: 200,
          data: [{ id: red.id, message: 'red-flag record has been deleted' }],
        });
      }
      return res
        .status(401)
        .json({ status: 401, error: 'not authorized to delete record' });
    }
    return res.status(404).json({ status: 404, error: 'record not found' });
  }
}

export default redflagController;
