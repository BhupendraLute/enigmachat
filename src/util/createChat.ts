"use client";
import axios from "axios";
import { getSession } from "next-auth/react";

export const createNewChat = async (prompt: string) => {
	try {
		const session = await getSession();
		const userId = session?.user && session?.user._id;

		const response = await axios.post(`http://localhost:3000/api/chat`, {
			title: prompt.length > 15 ? `${prompt.slice(0, 15)}...` : prompt,
			prompt: prompt,
			userId,
		});

		const data = response.data;
		const errorMessage = data?.error;
		const successMessage = data?.message;
		const chatData = data.data;

		return { chatData, successMessage, errorMessage };
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const addConversationInChat = async (prompt: string, chatId: string) => {
	try {
		const response = await axios.patch(
			`http://localhost:3000/api/chat/${chatId}`,
			{
				prompt: prompt,
				chatId,
			}
		);

		const data = response.data;
		const errorMessage = data?.error;
		const successMessage = data?.message;
		const chatData = data.data;

		return { chatData, successMessage, errorMessage };
	} catch (error) {
		console.log(error);
		return false;
	}

	return;
};

export const getChat = async (id: string) => {
	try {
		const response = await axios.get(`http://localhost:3000/api/chat/${id}`);

		const data = response.data;
		const errorMessage = data?.error;
		const successMessage = data?.message;
		const chatData = data.data;

		return { chatData, successMessage, errorMessage };
	} catch (error) {
		console.log(error);
		return false;
	}
};
