const CREATE_LIST = "CREATE_LIST";

let initialState = [
  { name: "Board1 List1", id: "list1", boardId: "board1" },
  { name: "Board1 List2", id: "list2", boardId: "board1" },
  { name: "Board1 List3", id: "list3", boardId: "board1" },
  { name: "Board2 List1", id: "list4", boardId: "board2" },
  { name: "Board2 List2", id: "list5", boardId: "board2" },
  { name: "Board2 List3", id: "list6", boardId: "board2" },
];

const ListReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let stateCopy = [...state];
      stateCopy.push({
        id: action.id,
        name: action.name,
        boardId: action.boardId,
      });
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createList = (name, id, boardId) => {
  return {
    type: CREATE_LIST,
    name,
    id,
    boardId,
  };
};

export default ListReduser;
