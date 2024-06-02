'use client'
import { createChat } from "@/store/slices/chatSlice";
import { useAppDispatch } from "@/store/store";
import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

export const createNewChat = async (prompt: string) => {
	try {
		const session = await getSession();

		const userId = session?.user?.id;

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
