"use client";
import axios from "axios";
import { getSession } from "next-auth/react";

export const createNewChat = async (prompt: string) => {
	try {
		const session = await getSession();
		const userId = session?.user && session?.user._id;

		const response = await axios.post(`/api/chat`, {
			title: prompt.length > 15 ? `${prompt.slice(0, 15)}...` : prompt,
			prompt: prompt,
			userId,
		});

		const data = response.data;
		const errorMessage = data?.error;
		const successMessage = data?.message;
		const chatData = data?.data;

		return { chatData, successMessage, errorMessage };
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const addConversationInChat = async (prompt: string, chatId: string) => {
	try {
		const response = await axios.patch(`/api/chat/${chatId}`, {
			prompt: prompt,
			chatId,
		});

		const data = response.data;
		const errorMessage = data?.error;
		const successMessage = data?.message;
		const chatData = data?.data;

		return { chatData, successMessage, errorMessage };
	} catch (error) {
		console.log(error);
		return false;
	}

	return;
};

export const getChat = async (id: string) => {
	try {
		const response = await axios.get(`/api/chat/${id}`);

		const data = response.data;
		const errorMessage = data?.error;
		const successMessage = data?.message;
		const chatData = data?.data;

		return { chatData, successMessage, errorMessage };
	} catch (error) {
		console.log(error);
		return false;
	}
};

// for list of chats
export const getAllChatsByUser = async () => {
	try {
		const session = await getSession();
		const userId = session?.user && session?.user._id;

		const response = await axios.post(`/api/chat/list`, {
			userId,
		});

		const data = response.data;
		const errorMessage = data?.error;
		const successMessage = data?.message;
		const chatData = data?.data;

		return { chatData, successMessage, errorMessage };
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const renameChat = async (id: any, title: string) => {
	try {
		const response = await axios.patch("/api/chat/rename", {
			chatId: id,
			title: title,
		});

		const data = response.data;
		if (data.status === 200) {
			return true;
		}
		return false;
	} catch (error) {
		// throw new Error("An error occurred while renaming the chat");
		return false
	}
};

export const deleteChat = async (id: any) => {
	try {
		const response = await axios.post(`/api/chat/delete`, {
			chatId: id,
		});

		const data = response.data;

		if (data.status === 200) {
			return true;
		}
		return false;
	} catch (error) {
		// throw new Error("An error occurred while deleteing the chat");
		return false;
	}
};
