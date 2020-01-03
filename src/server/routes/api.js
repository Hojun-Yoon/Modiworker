import { Router } from "express";

const api = db => {
  const router = Router();
  const boards = db.collection("boards");
  const users = db.collection("users");
  // Replace the entire board every time the users modifies it in any way.
  // This solution sends more data than necessary, but cuts down on code and
  // effectively prevents the db and client from ever getting out of sync
  router.post("/user", (req, res) => {
    const user = req.body;
    console.log(req.body, req.url, "유저 data 확인");
    //res.redirect("/");
    let chkEmail = users.findOne({ email: user.email });
    chkEmail.then(result => {
      if (!result) {
        users
          .replaceOne({ _id: user._id }, user, {
            upsert: true
          })
          .then(value => {
            console.log(res);
            res.send(value);
            // console.log("찍히는지 확인");
            //res.redirect("localhost/");
            // window.location.replace("localhost:1338/");
            //res.send("성공");
          });
        //res.redirect("http://google.com");
        //res.send('')
        //console.log("재확인");
        // window.location.href = "http:a//127.0.0.1:1337";
        // res.send("확인");
        // .then(() => {
        //   alert("재확인");
        //   res.redirect(req.baseUrl);
        // });
      }
    });
    // chkEmail.then(result => {
    //   return new Promise((resolve, reject) => {
    //     if (!result) {
    //       resolve(
    //         users
    //           .replaceOne({ _id: user._id }, user, {
    //             upsert: true
    //           })
    //           .then(() => {
    //             res.redirect("/");
    //             return true;
    //           })
    //       );
    //     } else {
    //       reject("duplicate email");
    //     }
    //   });
    // });
  });

  router.put("/board", (req, res) => {
    const board = req.body;
    boards
      .replaceOne({ _id: board._id, users: "guest" }, board, {
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

  router.get("/user", (req, res) => {
    res.redirect("/");
  });

  return router;
};

export default api;
