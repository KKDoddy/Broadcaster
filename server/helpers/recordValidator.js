import { check } from 'express-validator';

const checker = [
  check('title').exists().withMessage('title is required').isString()
    .withMessage('title should be a string'),
  check('type').exists().withMessage('type is required').isString()
    .withMessage('type should be a string'),
  check('comment').exists().withMessage('comment is required').isString()
    .withMessage('comment should be a string'),
  check('location').exists().withMessage('location is required').isString()
    .withMessage('location should be a string')
    .isLatLong()
    .withMessage('location should be a lat long string'),
  check('status').exists().withMessage('status is required').isString()
    .withMessage('status should be a string'),
];

const commentChecker = [
  check('comment').exists().withMessage('comment is required').isString()
    .withMessage('comment should be a string')
    .not()
    .isEmpty()
    .withMessage('comment cannot be empty'),
];

const locationChecker = [
  check('location').exists().withMessage('a valid location is required').isString()
    .isLatLong()
    .withMessage('Invalid location')
    .not()
    .isEmpty()
    .withMessage('location cannot be empty'),
];

export { checker, commentChecker, locationChecker };
