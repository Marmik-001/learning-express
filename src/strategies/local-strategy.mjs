import passport from "passport";
import { Strategy } from "passport-local";
import {User} from "../mongoose/schemas/user.mjs"
import { comparePassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  console.log("serilized:", user);

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserilized id :", id);

  try {
    const findUser = await User.findById(id)
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log("username", username, "password", password);

    try {
      const findUser = await User.findOne({username:username})
      if (!findUser) throw new Error("User Not Found");
      if (!comparePassword(password , findUser.password))
        throw new Error("Wrong Username or password");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
