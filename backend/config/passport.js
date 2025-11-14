import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import { UserModel } from '../models/mongodb.js'

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accesToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findByGoogleId(profile.id)
        if (!user) {
          user = await UserModel.createGoogleUser(profile)
        }
        done(null, user)
      } catch (error) {
        done(error, null)
      }
    }
  )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

export default passport
