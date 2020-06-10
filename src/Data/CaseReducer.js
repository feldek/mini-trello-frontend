const CREATE_EMPTY_CASE = "CREATE_EMPTY_CASE";

let initialState = [
  [
    { name: "list1 deal1", id: "1", listId: "list1" },
    { name: "list1 deal2", id: "2", listId: "list1" },
    { name: "list1 deal3", id: "3", listId: "list1" },
  ],
  [
    { name: "list2 deal1", id: "4", listId: "list2" },
    { name: "list2 deal2", id: "5", listId: "list2" },
    { name: "list2 deal3", id: "6", listId: "list2" },
  ],
  [
    { name: "list3 deal1", id: "7", listId: "list3" },
    { name: "list3 deal2", id: "8", listId: "list3" },
    { name: "list3 deal3", id: "9", listId: "list3" },
  ],
];

const CaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EMPTY_CASE: {
      let stateCopy = [...state];
      stateCopy.push([]);
      return stateCopy;
    }
    default:
      return state;
  }
};

export const createEmptyCase = () => {
  return { type: CREATE_EMPTY_CASE };
};

export default CaseReducer;
