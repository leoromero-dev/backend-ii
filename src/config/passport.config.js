import passport from 'passport';
import jwt from 'passport-jwt';

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

import userService from '../models/users.model.js'

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.headers) {
    token = req.headers.authorization.split(' ')[1];
  }
  return token;
}

const initializePassport = () => {

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'coderSecret'
  }, async (jwt_payload, done) => {
    try {
      return done(null, jet_payload)
    } catch (error) {
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.findById(id)
    done(null, user);
  });
}

export default initializePassport;