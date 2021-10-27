import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Api/Api";
import { IState } from "../Store";

export const updateDescription = createAsyncThunk<
  ITask | unknown,
  { description: string; id: string },
  { state: IState }
>("task/updateDescription", async ({ description, id }) => {
  await api.patchRequestAuth("task", { id, description });
});

export const createTasks = createAsyncThunk<void, ITask[], { state: IState }>(
  "task/createTasks",
  async (data) => {
    await api.postRequestAuth("tasks", { tasks: data });
  },
);

interface ITask {
  name: string;
  description: string;
  id: string;
  order: number;
  listId: string;
  visibility: boolean;
}

interface IAuthState {
  data: ITask[];
  isFetching: boolean;
}

const initialState: IAuthState = {
  data: [],
  isFetching: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateDescription.pending, (state, action) => {
      state.data.map((item) => {
        if (item.id === action.meta.arg.id) {
          item.description = action.meta.arg.description;
        }
        return item;
      });
    });
    builder.addCase(createTasks.pending, (state, action) => {
      action.meta.arg.map((task) => state.data.push({ ...task }));
    });
  },
});

export const {
  reducer: taskReducer,
  actions: {},
} = taskSlice;
