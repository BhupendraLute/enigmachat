import Chat from "@/models/Chat";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ChatState {
	title: string;
	chats: [];
}

// Define the initial state using that type
const initialState: ChatState = {
	title: "",
	chats: [],
};

export const ChatSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		createChat: (state, { payload }) => {
			state.title = payload.title;
			state.chats.push(payload.chat[0]);
		},
		addChat: (state, { payload }) => {
			state.chats.push(payload);
		},
		deleteChat: (state) => {
			return {
				title: "",
				chats: [],
			};
		},
	},
});

export const { createChat, addChat, deleteChat } = ChatSlice.actions;

export default ChatSlice.reducer;
