import { denormalize, schema } from "normalizr";
export function test() {
  console.log(1);
}
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
    currentUserId: userId
  } = store.getState();

  if (isGuest) {
    if (action.type === "ADD_USER") {
      const userSchema = new schema.Entity("user", {}, { idAttribute: "_id" });
      const entry = { user };
      const userData = denormalize(userId, userSchema, entry);
      fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      }).then(
        () => {
          alert("성공");
          this.context.router.push("/");
        },
        error => alert("실패", error)
      );
    }
    if (action.type === "DELETE_BOARD") {
      fetch("/api/board", {
        method: "DELETE",
        body: JSON.stringify({ boardId }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      // All action-types that are not DELETE_BOARD or PUT_BOARD_ID_IN_REDUX are currently modifying a board in a way that should
      // be persisted to db. If other types of actions are added, this logic will get unwieldy.
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
