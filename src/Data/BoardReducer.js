const CREATE_BOARD = "CREATE_BOARD";
const SAVE_ACTIVE_OBJECT = "SAVE_ACTIVE_OBJECT";
const CREATE_PROGRESS_LIST = "CREATE_PROGRESS_LIST";

let initialState = {
  listBoard: {
    "board 1": {
      id: 1,
      nameBoard: "firstBoard",
      progressList: {
        preparation: "deal one",
        execution: "deal two",
        end: "deal three",
      },
    },
    "board 2": {
      id: 2,
      nameBoard: "secondBoard",
      progressList: {
        preparation2: "deal2 one",
        execution2: "deal2 two",
        end2: "deal2 three",
      },
    },
  },
  activeObject: { id: "1" },
};

const BoardReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let stateCopy = { ...state };
      stateCopy.listBoard[`board ${action.id}`] = {
        id: action.id,
        nameBoard: action.nameBoard,
      };
      return stateCopy;
    }
    case SAVE_ACTIVE_OBJECT: {
      let stateCopy = { ...state };
      stateCopy.activeObject.id = action.id;
      return stateCopy;
    }
    case CREATE_PROGRESS_LIST: {
      let stateCopy = { ...state };
      stateCopy.listBoard[`board ${action.idBoard}`].progressList[
        action.idProgressList
      ] = {
        idProgressList: action.idProgressList,
        nameProgressList: action.nameProgressList,
      };
      return stateCopy;
    }

    default:
      return state;
  }
};

export const createBoard = (nameBoard, id) => {
  return { type: CREATE_BOARD, nameBoard, id };
};

export const saveActiveObject = (id) => {
  return { type: SAVE_ACTIVE_OBJECT, id };
};

export const createProgressList = (
  nameProgressList,
  idBoard,
  idProgressList
) => {
  return {
    type: CREATE_PROGRESS_LIST,
    nameProgressList,
    idBoard,
    idProgressList,
  };
};

export default BoardReduser;
