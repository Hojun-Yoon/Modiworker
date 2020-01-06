import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import createWelcomeBoard from "./createWelcomeBoard";
const LocalStrategy = require("passport-local").Strategy;

const configurePassport = db => {
  const users = db.collection("users");
  const boards = db.collection("boards");

  passport.serializeUser((user, cb) => {
    console.log("serializeUser", user);
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    console.log("deserializeUser", id);
    users.findOne({ _id: id }).then(user => {
      return cb(null, user);
    });
  });
  // passport.deserializeUser((id, cb) => {
  //   console.log("deserializeUser", id);
  //   for (let i = 0; i < users.length; i++) {
  //     let user = users[i];
  //     if (user._id === id) {
  //       return cb(null, user);
  //     }
  //   }
  //   // users.findOne({ username: user.username }).then(user => {
  //   //   cb(null, user);
  //   // });
  //   //cb(null, user);
  //   // users.findOne({ _id: id }).then(user => {
  //   //   cb(null, user);
  //   // });
  // });

  passport.use(
    new LocalStrategy(
      {
        session: true,
        passReqToCallback: true
      },
      function(req, username, password, done) {
        users.findOne({ username: username }).then(user => {
          if (user) {
            users.findOne({ password: password }).then(pwd => {
              if (pwd) {
                return done(null, user);
              } else {
                return done(
                  null,
                  false,
                  req.flash("invalid", "비밀번호가 올바르지 않습니다.")
                );
              }
            });
          } else {
            return done(
              null,
              false,
              req.flash("올바르지 않은 로그인 정보입니다.")
            );
          }
        });
      }
    )
  );
  // passport.use(
  //   new LocalStrategy(
  //     {
  //       session: true,
  //       passReqToCallback: false
  //     },
  //     function(username, password, done) {
  //       let uname = username;
  //       let pwd = password;
  //       for (let i = 0; i < users.length; i++) {
  //         let user = users[i];
  //         if (uname === user.username) {
  //           if (pwd === user.password) {
  //             console.log("LocalStrategy", user);
  //             done(null, user);
  //           } else {
  //             done(null, false);
  //           }
  //         }
  //       }
  //       done(null, false);
  //     }
  //   )
  // );
  // passport.use(
  //   new LocalStrategy(
  //     {
  //       usernameField: "username",
  //       passwordField: "password",
  //       session: true,
  //       passReqToCallback: true
  //     },
  //     (req, username, password, done) => {
  //       users.find(
  //         { $and: [{ username: username }, { password: password }] },
  //         (err, user) => {
  //           if (err) {
  //             return done(err);
  //           }
  //           if (!user) {
  //             return done(null, false, req.flash("message", "User Not found."));
  //           }
  //           return done(null, user);
  //         }
  //       );
  //     }
  //   )
  // );
};

export default configurePassport;
