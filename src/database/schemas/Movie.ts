import mongoose, { Schema } from 'mongoose';
import { IMovie } from 'types/IMovie';

const movieSchema = new mongoose.Schema<IMovie>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
      },
    ],
  },
  { timestamps: true }
);

export const Movie = mongoose.model('Movie', movieSchema);
