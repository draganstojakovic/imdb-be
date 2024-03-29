import { User } from 'database/schemas/User';
import { body } from 'express-validator';

const registerValidator = [
  body('fname')
    .exists({ checkFalsy: true })
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be string type'),
  body('lname')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be string type'),
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email: email });
      if (user) throw new Error('Email already in use');
      return true;
    }),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 8,
      minSymbols: 0,
      minNumbers: 2,
      minLowercase: 0,
      minUppercase: 0,
    })
    .withMessage('Password is too weak'),
  body('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords dont match');
      return true;
    }),
];

export default registerValidator;
