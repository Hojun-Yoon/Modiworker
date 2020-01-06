import { Router } from "express";
import passport from "passport";

const api = db => {
  const router = Router();
  const boards = db.collection("boards");
  const users = db.collection("users");

  router.post("/user", (req, res) => {
    const user = req.body;
    console.log(req.body, req.url, "유저 data 확인");
    let chkEmail = users.findOne({ username: user.username });
    chkEmail.then(result => {
      if (!result) {
        users
          .replaceOne({ _id: user._id }, user, {
            upsert: true
          })
          .then(value => {
            res.send(value);
          });
      }
    });
  });

  router.put("/edit", (req, res) => {
    const user = req.body;
    // let findUser = users.findOne({ username: user.username });
    // findUser.then(result => {
    //   users
    //     .replaceOne({ name: user.name, password: user.password }, user, {
    //       upsert: true
    //     })
    //     .then(value => {
    //       res.send(value);
    //     });
    // });
    let findUser = users.update(
      { username: user.username },
      { username: user.username, name: user.name, password: user.password }
    );
    findUser.then(value => {
      res.send(value);
    });
  });
  // router.post("/auth", (req, res) => {
  //   const user = req.body;
  //   //console.log(req.body, "user data 확인");
  //   //res.send(user);
  //   let chkLogin = users.findOne({ username: user.username });
  //   chkLogin.then(result => {
  //     if (!result) {
  //       return res.status(400).json({ message: "fail" });
  //     } else {
  //       return res.redirect("/");
  //     }
  //   });
  // });
  router.post(
    "/auth",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  // router.post(
  //   "/auth",
  //   passport.authenticate("local", {
  //     failureRedirect: "/login",
  //     failureFlash: true
  //   }),
  //   (req, res) => {
  //     const user = req.body;
  //     console.log(user, "user data 확인");
  //     let chkLogin = users.findOne({ username: user.username });
  //     chkLogin.then(result => {
  //       if (!result) {
  //         return res.status(400).json({ message: "fail" });
  //       } else {
  //         return res.status(200);
  //       }
  //     });
  //   }
  // );
  // router.post("/auth", (req, res, next) => {
  //   passport.authenticate("local", (err, user, info) => {
  //     if (err) return next(err);

  //     if (!user) {
  //       return res.status(400).json({ message: "fail message" });
  //     }
  //     return res.status(200);
  //   });
  // });

  router.delete("/userDelete", (req, res) => {
    const bodyData = req.body;
    console.log(bodyData, "삭제 data 확인");
    users.deleteOne({ _id: bodyData.user._id }).then(result => {
      res.send(result);
    });
  });
  router.put("/board", (req, res) => {
    const board = req.body;
    boards
      .replaceOne({ _id: board._id, users: req.user.username }, board, {
        upsert: true
      })
      .then(result => {
        res.send(result);
      });
  });

  router.delete("/board", (req, res) => {
    const { boardId } = req.body;
    boards.deleteOne({ _id: boardId }).then(result => {
      res.send(result);
    });
  });

  router.get("/signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  return router;
};

export default api;
