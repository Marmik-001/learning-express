import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import 'dotenv/config'
const CLIENTID = process.env.CLIENT_ID
const CLIENTSECRET = process.env.CLIENT_SECRET
const REDIRECT = process.env.REDIRECT
passport.use(
    new Strategy({
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL:REDIRECT
    })
) 