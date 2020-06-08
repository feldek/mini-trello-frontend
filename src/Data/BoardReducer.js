const CREATE_BOARD = "CREATE_BOARD";
const SAVE_ACTIVE_OBJECT = "SAVE_ACTIVE_OBJECT";
const CREATE_PROGRESS_LIST = "CREATE_PROGRESS_LIST";
const CREATE_CASE = "CREATE_CASE";

let initialState = {
  boardList: {
    "board 1": {
      numberBoard: 1,
      nameBoard: "firstBoard",
      progressList: {
        "progressList 1": {
          numberProgressList: 1,
          nameProgressList: "board1 progressList 1",
          caseList: [
            { id: "1", content: "stand up" },
            { id: "2", content: "become a fairy" },
            { id: "3", content: "kill bill" },
            { id: "4", content: "and other" },
          ],
        },
        "progressList 2": {
          numberProgressList: 2,
          nameProgressList: "board1 progressList 2",
          caseList: [
            { id: "1", content: "stand up" },
            { id: "5", content: "become a fairy" },
            { id: "6", content: "kill bill" },
            { id: "7", content: "and other" },
          ],
        },
        "progressList 3": {
          numberProgressList: 3,
          nameProgressList: "board1 progressList 3",
          caseList: [
            { id: "8", content: "stand up" },
            { id: "9", content: "become a fairy" },
            { id: "10", content: "kill bill" },
            { id: "11", content: "and other" },
          ],
        },
      },
    },
    "board 2": {
      numberBoard: 2,
      nameBoard: "secondBoard",
      progressList: {
        "progressList 1": {
          numberProgressList: 1,
          nameProgressList: "board2 progressList 1",
          caseList: [
            { id: "11", content: "stand up" },
            { id: "12", content: "become a fairy" },
            { id: "13", content: "kill bill" },
            { id: "14", content: "and other" },
          ],
        },
        "progressList 2": {
          numberProgressList: 1,
          nameProgressList: "board2 progressList 2",
          caseList: [
            { id: "15", content: "stand up" },
            { id: "16", content: "become a fairy" },
            { id: "17", content: "kill bill" },
            { id: "18", content: "and other" },
          ],
        },
        "progressList 3": {
          numberProgressList: 3,
          nameProgressList: "board2 progressList 2",
          caseList: [
            { id: "19", content: "stand up" },
            { id: "20", content: "become a fairy" },
            { id: "21", content: "kill bill" },
            { id: "22", content: "and other" },
          ],
        },
      },
    },
  },
  activeObject: { numberBoard: 1, numberProgressList: 1 },
};

const BoardReduser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: {
      let stateCopy = { ...state };
      stateCopy.boardList[`board ${action.numberBoard}`] = {
        numberBoard: action.numberBoard,
        nameBoard: action.nameBoard,
        progressList: {},
      };
      return stateCopy;
    }
    case SAVE_ACTIVE_OBJECT: {
      let stateCopy = { ...state };
      stateCopy.activeObject.numberBoard = action.numberBoard;
      return stateCopy;
    }
    case CREATE_PROGRESS_LIST: {
      let stateCopy = { ...state };
      stateCopy.boardList[`board ${action.activeNumberBoard}`].progressList[
        `progressList ${action.numberProgressList}`
      ] = {
        numberProgressList: action.numberProgressList,
        nameProgressList: action.nameProgressList,
        caseList: [],
      };
      return stateCopy;
    }
    case CREATE_CASE: {
      let stateCopy = { ...state };
      stateCopy.boardList[`board ${action.activeNumberBoard}`].progressList[
        action.nameObjectProgressList
      ].caseList.push({content:action.nameCase});
      return stateCopy;
    }

    default:
      return state;
  }
};

export const createBoard = (nameBoard, numberBoard) => {
  return { type: CREATE_BOARD, nameBoard, numberBoard };
};

export const saveActiveObject = (numberBoard) => {
  return { type: SAVE_ACTIVE_OBJECT, numberBoard };
};

export const createProgressList = (
  nameProgressList,
  activeNumberBoard,
  numberProgressList
) => {
  return {
    type: CREATE_PROGRESS_LIST,
    nameProgressList,
    activeNumberBoard,
    numberProgressList,
  };
};
export const createCaseList = (
  nameCase,
  activeNumberBoard,
  nameObjectProgressList
) => {
  return {
    type: CREATE_CASE,
    nameCase,
    activeNumberBoard,
    nameObjectProgressList,
  };
};

export default BoardReduser;
