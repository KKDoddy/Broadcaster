/* eslint-disable object-shorthand */
import { validationResult } from 'express-validator';
import executeQuery from '../config/connection';
import redflag from '../queries/red-flag';

class redflagController {
  static async createRedFlag(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const {
        title, comment, location,
      } = req.body;
      if (req.files.images && req.files.videos) {
        const created = await executeQuery(redflag.createRedFlag, [title, 'redflag', comment, location, 'pending', req.files.images[0].path, req.files.videos[0].path, req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              id: created[0].id,
              message: 'Created red-flag record',
            },
          ],
        });
      } else if (req.files.images) {
        const created = await executeQuery(redflag.createRedFlag, [title, 'redflag', comment, location, 'pending', req.files.images[0].path, '', req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              id: created[0].id,
              message: 'Created red-flag record',
            },
          ],
        });
      } else if (req.files.videos) {
        const created = await executeQuery(redflag.createRedFlag, [title, 'redflag', comment, location, 'pending', '', req.files.videos[0].path, req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              id: created[0].id,
              message: 'Created red-flag record',
            },
          ],
        });
      } else {
        const created = await executeQuery(redflag.createRedFlag, [title, 'redflag', comment, location, 'pending', '', '', req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              id: created[0].id,
              message: 'Created red-flag record',
            },
          ],
        });
      }
    }
  }
}

export default redflagController;
