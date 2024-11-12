import { configureStore } from "@reduxjs/toolkit";
import incomeReduser from './incomeSlice'

const store=configureStore(
    {
        reducer:
        {
            income: incomeReduser
        }
    }
)
// Export the store
export default store;

// Define RootState and AppDispatch types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;