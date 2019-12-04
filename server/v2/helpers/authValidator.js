import { check } from 'express-validator';

const signupChecker = [
  check('firstName').exists().withMessage('first name is required').isAlpha()
    .withMessage('first name is required')
    .isLength({ min: 3 })
    .withMessage('should be atleast 3 characters'),
  check('lastName').exists().withMessage('last name is required').isAlpha()
    .withMessage('last name is required')
    .isLength({ min: 3 })
    .withMessage('should be atleast 3 characters'),
  check('email', 'invalid email address').exists().withMessage('email required').trim()
    .isEmail()
    .normalizeEmail(),
  check('phoneNumber', 'a 10 digit number is expected').exists().withMessage('phoneNumber required').isNumeric()
    .isLength({ min: 10, max: 10 }),
  check('username').exists().withMessage('username is required').isAlphanumeric()
    .withMessage('special characters are not allowed')
    .isLength({ min: 3 })
    .withMessage('username should atleat have 3 characters'),
  check('password').exists().withMessage('password required').isString()
    .withMessage('a string is expected')
    .isLength({ min: 6 })
    .withMessage('should atleast 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/)
    .withMessage('password must contain at least 1 lowercase alphabetical character, 1 uppercase, alphabetical character, 1 numeric character, one special character')
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirmation) {
        throw new Error('incorrect password confirmation');
      }
      return value;
    }),
];

export { signupChecker };
