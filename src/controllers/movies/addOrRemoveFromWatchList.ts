import { Request, Response } from 'express';
import { sanitizeError, sanitizeUser } from 'util/sanitizers';
import { User } from 'database/schemas/User';

export const addOrRemoveFromWatchList = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userId = req.session.user._id;

  const isWatched = await User.count({ watchList: id }).where({
    _id: userId,
  });

  try {
    if (isWatched === 1) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { watchList: id } }
      );
      const index = req.session.user.watchList.indexOf(id);
      if (index !== -1) req.session.user.watchList.splice(index, 1);
      return res.status(200).json(sanitizeUser(req.session.user));
    } else if (isWatched === 0) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { watchList: id } }
      );
      req.session.user.watchList.push(id);
      return res.status(200).json(sanitizeUser(req.session.user));
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(sanitizeError('Server Error'));
  }
};
