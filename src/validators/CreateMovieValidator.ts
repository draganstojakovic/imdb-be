import { body } from 'express-validator';
import { URL } from 'url';
import { Movie } from 'database/schemas/Movie';
import { Genre } from 'database/schemas/Genre';

const createMovieValidator = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be string type')
    .custom(async (title: string) => {
      const movie = await Movie.count({ title });
      if (movie > 0) throw new Error('Movie already exists');
      return true;
    }),
  body('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be string type'),
  body('coverImage')
    .exists({ checkFalsy: true })
    .withMessage('Cover image is required')
    .isString()
    .withMessage('Cover image must be string type')
    .custom((coverImage: string) => {
      const url = new URL(coverImage);
      if (!url) throw new Error('Cover image must be a link');
      return true;
    })
    .withMessage('Cover image must be a link'),
  body('genres')
    .exists({ checkFalsy: true })
    .withMessage('Genres are required')
    .custom(async (genres) => {
      for (let i = 0; i < genres.length; i++) {
        if (typeof genres[i] !== 'string') {
          throw new Error('Genres must be an array of strings.');
        }
        const genre = await Genre.exists({ _id: genres[i] });
        if (!genre) throw new Error(`Genre of id: ${genres[i]} not found.`);
      }
      return true;
    }),
];

export default createMovieValidator;