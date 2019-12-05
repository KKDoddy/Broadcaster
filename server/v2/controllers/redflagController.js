/* eslint-disable object-shorthand */
import { validationResult } from 'express-validator';
import executeQuery from '../config/connection';
import redflag from '../queries/red-flag';

class redflagController {
  static async getAll(req, res) {
    const owned = await executeQuery(redflag.getAllRedflag, []);
    res.status(200).json({ staus: 200, data: owned });
  }

  static async findOne(req, res) {
    const red = await executeQuery(redflag.getRedflag, [req.params.id]);
    if (red.length === 1) {
      res.status(200).json({ status: 200, data: red });
    } else {
      res.status(404).json({ status: 404, error: 'record not found' });
    }
  }

  static async createRedFlag(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const {
        title, comment, location,
      } = req.body;
      if (req.files.images && req.files.videos) {
        const created = await executeQuery(redflag.createRedFlag, [req.id, title, 'redflag', comment, location, 'pending', req.files.images[0].path, req.files.videos[0].path, req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created red-flag record',
            },
          ],
        });
      } else if (req.files.images) {
        const created = await executeQuery(redflag.createRedFlag, [req.id, title, 'redflag', comment, location, 'pending', req.files.images[0].path, '', req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created red-flag record',
            },
          ],
        });
      } else if (req.files.videos) {
        const created = await executeQuery(redflag.createRedFlag, [req.id, title, 'redflag', comment, location, 'pending', '', req.files.videos[0].path, req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created red-flag record',
            },
          ],
        });
      } else {
        const created = await executeQuery(redflag.createRedFlag, [req.id, title, 'redflag', comment, location, 'pending', '', '', req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created red-flag record',
            },
          ],
        });
      }
    }
  }

  static async patchComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const red = await executeQuery(redflag.getRedflag, [req.params.id]);
      if (red.length === 1) {
        if (red[0].createdby === (req.uId).toString()) {
          const updated = await executeQuery(redflag.editRedflagComment, [req.body.comment, req.params.id]);
          return res.status(201).json({
            status: 201,
            data: [
              {
                record: updated[0],
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

  static async patchLocation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const red = await executeQuery(redflag.getRedflag, [req.params.id]);
      if (red.length === 1) {
        if (red[0].createdby === (req.uId).toString()) {
          const updated = await executeQuery(redflag.editRedflagLocation, [req.body.location, req.params.id]);
          return res.status(201).json({
            status: 201,
            data: [
              {
                record: updated[0],
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

}

export default redflagController;
