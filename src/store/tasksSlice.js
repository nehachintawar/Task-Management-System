import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("Tasks")) || [],
  filters: 'All'
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id === action.payload.id);
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    updateStatus: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          if (task.status === "Completed") {
            return { ...task, status: "Pending" };
          } else {
            return { ...task, status: "Completed" };
          }
        }
      });
      localStorage.setItem("Tasks", JSON.stringify(state.tasks));
    },
    setFilter : (state, action) =>{
      state.filters = action.payload;
    }
  },
});

export const { addTask, deleteTask, editTask, updateStatus, setFilter } =
  tasksSlice.actions;

export default tasksSlice.reducer;
