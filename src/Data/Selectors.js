// import { useSelector } from "react-redux";
// import

export const getBoardList = (state) => {
  return state.board.boardList;
};
export const getBoard = (state, nameObjectBoard) => {
  return state.board.boardList[nameObjectBoard];
};
export const getNumberBoard = (state, nameObjectBoard) => {
  return state.board.boardList[nameObjectBoard].numberBoard;
};
export const getNameBoard = (state, nameObjectBoard) => {
  return state.board.boardList[nameObjectBoard].nameBoard;
};
export const getProgressList = (state, nameObjectBoard) => {
  return state.board.boardList[nameObjectBoard].progressList;
};
export const getNameProgressList = (state, nameObjectBoard, nameObjectProgressList) => {
  return state.board.boardList[nameObjectBoard].progressList[nameObjectProgressList]
    .nameProgressList;
};
export const getNameActiveBoard = (state) => {
  return `board ${state.board.activeObject.numberBoard}`;
};
export const getNumberActiveBoard = (state) => {
  return state.board.activeObject.numberBoard;
};
export const getNameActiveProgressList = (state) => {
  return `progressList ${state.board.activeObject.progressList}`;
};
export const getNumberActiveProgressList = (state) => {
  return state.board.activeObject.progressList;
};

export const getCaseList=(state, nameObjectBoard, nameObjectProgressList)=>{
  return state.board.boardList[nameObjectBoard].progressList[nameObjectProgressList]
    .caseList;
}
// export const CounterComponent = () => {
//   const counter = useSelector((state: RootState) => state.counter)
//   return <div>{counter}</div>
// }
