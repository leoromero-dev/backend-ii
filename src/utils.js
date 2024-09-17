import bcrypt from 'bcrypt';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const validatePassword = (user, password) => bcrypt.compareSync(password, user.password);

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
      }
      req.user = user
      next()
    })
      (req, res, next)
  }
}