"use client";
import { createChat } from "@/store/slices/chatSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { createNewChat } from "@/util/createChat";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatIdPage = () => {
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const dispatch = useAppDispatch();

	const initialPrompt = useAppSelector(
		(state: RootState) => state.initialPrompt.prompt
	);

	const storeChats = useAppSelector((state: RootState) => state.chats);
	const chats = storeChats.chats

	useEffect(() => {
		console.log("Initial Prompt: ", initialPrompt);

		async function runChat() {
			try {
				setLoading(true)
				if (initialPrompt) {
					const newChat : any = await createNewChat(initialPrompt);
					const { chatData, successMessage, errorMessage } : any = newChat;
					dispatch(createChat(chatData));
	
					console.log(newChat);
				}
			} catch (error) {
				return false
			}finally {
				setLoading(false)
			}
		}
		runChat();
	}, [initialPrompt]);

	return (
		<section className="mt-4 mx-3 md:mt-6 flex flex-col gap-4 items-center">
			<div className="p-4 w-full md:w-[65%] bg-gray-700 overflow-y-scroll h-[calc(100vh-12rem)] rounded-lg custom-scrollbar">
				{chats.map(
					(chat: { prompt: string; response: string }, index) => (
						<div key={index}>
							<p
								dangerouslySetInnerHTML={{
									__html: chat.prompt,
								}}
							></p>
							<p
								dangerouslySetInnerHTML={{
									__html: chat.response,
								}}
							></p>
						</div>
					)
				)}

				{loading && (
					<div className="loader">
						<hr />
						<hr />
						<hr />
					</div>
				)}
			</div>
		</section>
	);
};

export default ChatIdPage;
