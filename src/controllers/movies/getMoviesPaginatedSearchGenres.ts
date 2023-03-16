import { Request, Response } from 'express';
import { sanitizeError, sanitizeMovies } from 'util/sanitizers';
import { Movie } from 'database/schemas/Movie';
import { genresQueryFormatter } from 'util/queryFormatters';

export const getMoviesPaginatedSearchGenres = async (
  req: Request,
  res: Response
) => {
  const { page = 1, limit = 10, search, genres } = req.query;

  const formattedGenres = genresQueryFormatter(genres as string);

  const queryConditions = {
    title: { $regex: search, $options: 'i' },
    genres: formattedGenres,
  };

  try {
    const movies = await Movie.find(queryConditions)
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .populate('genres');

    const count = await Movie.count(queryConditions);

    const sanitizedMovies = sanitizeMovies(movies);

    return res.status(200).json({
      movies: sanitizedMovies,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
