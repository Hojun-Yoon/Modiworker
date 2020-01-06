import { denormalize, schema } from "normalizr";

// Persist the board to the database after almost every action.
const persistMiddleware = store => next => action => {
  next(action);
  const {
    isGuest,
    user,
    boardsById,
    listsById,
    cardsById,
    currentBoardId: boardId,
    currentUserId: userId,
    userEdit
  } = store.getState();

  if (isGuest) {
    if (action.type === "ADD_USER") {
      const userSchema = new schema.Entity("user", {}, { idAttribute: "_id" });
      const entry = { user };
      const userData = denormalize(userId, userSchema, entry);
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      }).then(
        result => {
          alert("성공");
          window.location.replace("/");
          //this.context.router.push("/");
        },
        error => alert("실패", error)
      );
    }
    // if (action.type === "USER_CONFIRM") {
    //   fetch("/api/auth", {
    //     method: "POST",
    //     body: JSON.stringify(user),
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include"
    //   }).then(result => {
    //     console.log(result);
    //     // if (!user._id) {
    //     //   alert("로그인 정보가 맞지 않습니다.");
    //     // } else {
    //     //   alert("정상적으로 로그인 되었습니다.");
    //     // }
    //     //window.location.replace("/login");
    //   });
    // }
    //       alert("로그인 정보가 맞지 않습니다.");
    //       window.location.replace("/login");
    //       // alert(result.status);
    //     //   console.log(result, "결과값");
    //     //   if (result.status === 200) {
    //     //     alert("정상적으로 로그인되었습니다.");
    //     //     window.location.replace("/");
    //     //   } else {
    //     //     alert("로그인 정보가 맞지 않습니다.");
    //     //     window.location.replace("/login");
    //     //   }
    //     // });
    //     }
    //   }
    // }
  }
  if (user) {
    if (action.type === "DELETE_BOARD") {
      fetch("/api/board", {
        method: "DELETE",
        body: JSON.stringify({ userId }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      // All action-types that are not DELETE_BOARD or PUT_BOARD_ID_IN_REDUX are currently modifying a board in a way that should
      // be persisted to db. If other types of actions are added, this logic will get unwieldy.
    } else if (action.type === "USER_EDIT") {
      console.log(userEdit);
      // alert("접근했습니다.");
      fetch("/api/edit", {
        method: "PUT",
        body: JSON.stringify(userEdit),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      }).then(result => {
        console.log(result);
        window.location.replace("/");
      });
    } else if (action.type === "DELETE_USER") {
      fetch("/api/userDelete", {
        method: "DELETE",
        body: JSON.stringify({ user }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      }).then(() => {
        window.location.replace("/");
      });
    } else if (action.type !== "PUT_BOARD_ID_IN_REDUX") {
      // Transform the flattened board state structure into the tree-shaped structure that the db uses.
      const card = new schema.Entity("cardsById", {}, { idAttribute: "_id" });
      const list = new schema.Entity(
        "listsById",
        { cards: [card] },
        { idAttribute: "_id" }
      );
      const board = new schema.Entity(
        "boardsById",
        { lists: [list] },
        { idAttribute: "_id" }
      );
      const entities = { cardsById, listsById, boardsById };

      const boardData = denormalize(boardId, board, entities);

      // TODO: Provide warning message to user when put request doesn't work for whatever reason
      fetch("/api/board", {
        method: "PUT",
        body: JSON.stringify(boardData),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
    }
  }
};

export default persistMiddleware;
