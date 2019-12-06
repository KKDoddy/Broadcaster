/* eslint-disable object-shorthand */
import { validationResult } from 'express-validator';
import executeQuery from '../config/connection';
import intervention from '../queries/record';

class interventionController {
  static async getAll(req, res) {
    const owned = await executeQuery(intervention.getAllMyRecord, [req.uId, 'intervention']);
    res.status(200).json({ staus: 200, data: owned });
  }

  static async findOne(req, res) {
    const int = await executeQuery(intervention.getRecord, [req.params.id, 'intervention']);
    if (int.length === 1) {
      res.status(200).json({ status: 200, data: int });
    } else {
      res.status(404).json({ status: 404, error: 'record not found' });
    }
  }

  static async createIntervention(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const {
        title, comment, location,
      } = req.body;
      if (req.files.images && req.files.videos) {
        const created = await executeQuery(intervention.createRecord, [req.id, title, 'intervention', comment, location, 'pending', req.files.images[0].path, req.files.videos[0].path, req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created intervention record',
            },
          ],
        });
      } else if (req.files.images) {
        const created = await executeQuery(intervention.createRecord, [req.id, title, 'intervention', comment, location, 'pending', req.files.images[0].path, '', req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created intervention record',
            },
          ],
        });
      } else if (req.files.videos) {
        const created = await executeQuery(intervention.createRecord, [req.id, title, 'intervention', comment, location, 'pending', '', req.files.videos[0].path, req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created intervention record',
            },
          ],
        });
      } else {
        const created = await executeQuery(intervention.createRecord, [req.id, title, 'intervention', comment, location, 'pending', '', '', req.uId]);
        res.status(201).json({
          status: 201,
          data: [
            {
              record: created[0],
              message: 'Created intervention record',
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
      const int = await executeQuery(intervention.getRecord, [req.params.id, 'intervention']);
      if (int.length === 1) {
        if (int[0].createdby === (req.uId).toString()) {
          const updated = await executeQuery(intervention.editRecordComment, [req.body.comment, req.params.id, 'intervention']);
          return res.status(201).json({
            status: 201,
            data: [
              {
                record: updated[0],
                message: "Updated intervention record's comment",
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

  static async patchStatus(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const int = await executeQuery(intervention.getRecord, [req.params.id, 'intervention']);
      if (int.length === 1) {
        const updated = await executeQuery(intervention.editRecordStatus, [req.body.status, req.params.id, 'intervention']);
        return res.status(201).json({
          status: 201,
          data: [
            {
              record: updated[0],
              message: "Updated intervention record's comment",
            },
          ],
        });
      }
      return res.status(404).json({ status: 404, error: 'record not found' });
    }
  }

  // eslint-disable-next-line consistent-return
  static async patchLocation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const int = await executeQuery(intervention.getRecord, [req.params.id, 'intervention']);
      if (int.length === 1) {
        if (int[0].createdby === (req.uId).toString()) {
          const updated = await executeQuery(intervention.editRecordLocation, [req.body.location, req.params.id, 'intervention']);
          return res.status(201).json({
            status: 201,
            data: [
              {
                record: updated[0],
                message: "Updated intervention record's location",
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

  static async deleteIntervention(req, res) {
    const int = await executeQuery(intervention.getRecord, [req.params.id, 'intervention']);
    if (int.length === 1) {
      if (int[0].createdby === (req.uId).toString()) {
        const deleted = executeQuery(intervention.deleteRecord, [req.params.id, 'intervention']);
        return res.status(200).json({
          status: 200,
          data: [{ id: int.id, message: 'intervention record has been deleted' }],
        });
      }
      return res
        .status(401)
        .json({ status: 401, error: 'not authorized to delete record' });
    }
    return res.status(404).json({ status: 404, error: 'record not found' });
  }
}

export default interventionController;
