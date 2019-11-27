/* eslint-disable object-shorthand */
import { validationResult } from "express-validator";
import Redflag from "../models/red-flag";

class redflagController {
    
  static getAll(req, res) {
    const owned = Redflag.filter(record => {
      return record.createdBy === req.uEmail;
    });
    res.status(200).json({ staus: 200, data: owned });
  }

  static createRedFlag(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ status: 422, error: errors.array() });
    } else {
      const { title, comment, location, status } = req.body;
      if (req.files) {
        /* istanbul ignore else */
        if (req.files.images && req.files.videos) {
          Redflag.push({
            id: req.id,
            createdOn: new Date(),
            createdBy: req.uEmail,
            title: title,
            type: "red-flag",
            comment: comment,
            location: location,
            status: status,
            images: req.files.images[0].path,
            videos: req.files.videos[0].path
          });
          res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[Redflag.length - 1].id,
                message: "Created red-flag record"
              }
            ]
          });
        } else if (req.files.images) {
          Redflag.push({
            id: req.id,
            createdOn: new Date(),
            createdBy: req.uEmail,
            title: title,
            type: "red-flag",
            comment: comment,
            location: location,
            status: status,
            images: req.files.images[0].path,
            videos: ""
          });
          res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[Redflag.length - 1].id,
                message: "Created red-flag record"
              }
            ]
          });
        } else if (req.files.videos) {
          Redflag.push({
            id: req.id,
            createdOn: new Date(),
            createdBy: req.uEmail,
            title: title,
            type: "red-flag",
            comment: comment,
            location: location,
            status: status,
            images: "",
            videos: req.files.videos[0].path
          });
          res.status(201).json({
            status: 201,
            data: [
              {
                id: Redflag[Redflag.length - 1].id,
                message: "Created red-flag record"
              }
            ]
          });
        }
      } else {
        Redflag.push({
          id: req.id,
          createdOn: new Date(),
          createdBy: req.uEmail,
          title: title,
          type: "red-flag",
          comment: comment,
          location: location,
          status: status,
          images: "",
          videos: ""
        });
        res.status(201).json({
          status: 201,
          data: [
            {
              id: Redflag[Redflag.length - 1].id,
              message: "Created red-flag record"
            }
          ]
        });
      }
    }
  }
}

export default redflagController;
