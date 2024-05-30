import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface PromptState {
	prompt: string;
}

// Define the initial state using that type
const initialState: PromptState = {
	prompt: ''
};

export const PromptSlice = createSlice({
	name: "initialPrompt",
	initialState,
	reducers: {
		save: (state, { payload }) => {
			state.prompt = payload;
		},
	},
});

export const { save } = PromptSlice.actions;

export default PromptSlice.reducer;
