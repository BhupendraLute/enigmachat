import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ChatState {
	chats: [];
}

// Define the initial state using that type
const initialState: ChatState = {
	chats: [],
};

export const AllChatsListSlice = createSlice({
	name: "chatslist",
	initialState,
	reducers: {
		setChatList: (state, { payload }) => {
			if (payload) {
				state.chats = payload.reverse();
			}
		},
		deleteChatFromList: (state, { payload }) => {
			const indexToDelete = state.chats.findIndex(
				(obj: any) => obj._id == payload
			);
			if (indexToDelete !== -1) {
				state.chats.splice(indexToDelete, 1);
			}
		},
		renameChatfromList: (state: any, { payload }) => {
			for (const chat of state.chats) {
				if (chat._id === payload.id) {
					chat.title = payload.title; 
					break;
				}
			}
		},
		addNewChatToList: (state: any, { payload }) => {
			state.chats.unshift(payload);
		},
	},
});

export const {
	setChatList,
	deleteChatFromList,
	renameChatfromList,
	addNewChatToList,
} = AllChatsListSlice.actions;

export default AllChatsListSlice.reducer;
