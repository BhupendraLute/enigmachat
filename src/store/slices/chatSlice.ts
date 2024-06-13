import Chat from "@/models/Chat";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ChatState {
	title: string;
	chats: [];
	createdby: string;
}

// Define the initial state using that type
const initialState: ChatState = {
	title: "",
	chats: [],
	createdby: "",
};

export const ChatSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		createChat: (state: any, { payload }) => {
			state.title = payload.title;

			const chat = payload?.chat;
			state.chats = chat;

			state.createdby = payload.createdby;
		},
		addConversation: (state: any, { payload }) => {
			const chat = payload?.chat;
			if (chat) {
				state.chats = chat;
			}
		},
		deleteChat: (state) => {
			return {
				title: "",
				chats: [],
				createdby: "",
			};
		},
	},
});

export const { createChat, addConversation, deleteChat } = ChatSlice.actions;

export default ChatSlice.reducer;
