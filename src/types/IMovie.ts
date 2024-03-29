import { IGenre } from './IGenre';

export interface IMovie {
  _id: string;
  title: string;
  description: string;
  coverImage: IPosterDB;
  genres: string[];
  likes: string[];
  dislikes: string[];
  views: number;
  comments: string[];
}

export interface IMovieSanitized {
  id: string;
  title: string;
  description: string;
  coverImage: IPoster;
  genres: IGenre[];
  likes: [];
  dislikes: [];
  views: 0;
}

export interface IPoster {
  thumbnail: string;
  fullSize: string;
}

export interface IPosterDB extends IPoster {
  _id: string;
}

export type PosterAction = {
  action: 'delete';
  filePath: string;
};

export interface IWatchList {
  watchList: IWatch[];
}

type IWatch = {
  _id: string;
  title: string;
  coverImage: {
    thumbnail: string;
  };
};

export type IMovieStrippedDown = Pick<IMovie, '_id' | 'coverImage'>;
