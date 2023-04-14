import { Request, Response } from 'express';
import { Movie } from 'database/schemas/Movie';
import { sanitizeError, sanitizeStrippedDownMovies } from 'util/sanitizers';

export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const response = await Movie.find({})
      .limit(10)
      .sort({ views: -1 })
      .select('_id coverImage');

    return res.status(200).json(sanitizeStrippedDownMovies(response));
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
