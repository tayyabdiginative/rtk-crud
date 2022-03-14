import { configureStore } from "@reduxjs/toolkit";
import { studentsApi } from "./services/Index";
console.log(studentsApi)
export const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (gDM) => gDM().concat(studentsApi.middleware),
});
 