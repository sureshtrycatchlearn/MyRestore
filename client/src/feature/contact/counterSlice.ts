import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data: number| any;
    title: string | any;
}

const initialState: CounterState = {
    data: null,
    title: 'YARC (yet another redux counter with redux toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.data -= action.payload
        }
    }
})

export const {increment, decrement} = counterSlice.actions;