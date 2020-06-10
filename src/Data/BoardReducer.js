const CREATE_BOARD = "CREATE_BOARD";

let initialState = [
  {
    id: "board1",
    name: "input boardName1",
  },
  {
    id: "board2",
    name: "input boardName2",
  },
];

const BoardReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let stateCopy = [...state];
      stateCopy.push({ id: action.id, name: action.name });
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createBoard = (name, id) => {
  return { type: CREATE_BOARD, name, id };
};

export default BoardReduser;
