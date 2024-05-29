import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ChatState {
	chats: [
		{
			prompt: string;
			response: string;
		}
	];
}

// Define the initial state using that type
const initialState: ChatState = {
	chats: [
		{
			prompt: "",
			response: "",
		},
	],
};

export const ChatSclice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addChat: (state, { payload }) => {
			const newChat = payload;
			state.chats.unshift(newChat);
		},
	},
});

export const { addChat } = ChatSclice.actions;

export default ChatSclice.reducer;
