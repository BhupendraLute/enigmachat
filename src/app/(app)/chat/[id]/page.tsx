"use client";
import {
	addConversation,
	createChat,
	deleteChat,
} from "@/store/slices/chatSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { addConversationInChat, getChat } from "@/utils/chatActions";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import InputPrompt from "@/components/InputPrompt";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatLoader from "@/components/ChatLoader";

const ChatIdPage = () => {
	const { data: session } = useSession();
	const userImage = session?.user?.image;

	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(true);

	const [scrollToBottom, setScrollToBottom] = useState(false);

	const dispatch = useAppDispatch();

	const { id }: { id: string } = useParams();

	const storeChats = useAppSelector((state: RootState) => state.chats);
	const chats = storeChats.chats;

	useEffect(() => {
		try {
			setLoading(true);
			setScrollToBottom(true);
			const recoverChat = async () => {
				const recoverdChat = await getChat(id);
				const { chatData, successMessage, errorMessage }: any =
					recoverdChat;
				dispatch(deleteChat());
				dispatch(createChat(chatData));
			};
			recoverChat();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setScrollToBottom(false);
		}
	}, []);


	// Scroll down to the last chat
	useEffect(() => {
		if (scrollToBottom) {
			const chatWindow = document.getElementById("chat-window");
			if (chatWindow) {
				chatWindow.scrollTop = chatWindow.scrollHeight;
			}
		}
	}, [scrollToBottom]);

	const handleSend = async () => {
		try {
			setLoading(true);
			setPrompt("");
			setScrollToBottom(true);
			const updateddChat = await addConversationInChat(prompt, id);
			const { chatData, successMessage, errorMessage }: any =
				updateddChat;

			dispatch(addConversation(chatData));
		} catch (error) {
		} finally {
			setLoading(false);
			setScrollToBottom(false);
		}
	};

	return (
		<section className="relative mt-4 mx-3 md:mt-6 flex flex-col gap-4 items-center">
			<div
				id="chat-window"
				className="max-md:p-1 p-4 w-full md:w-[85%] lg:w-[75%] bg-gray-900 overflow-y-scroll h-[calc(100vh-12rem)] rounded-lg custom-scrollbar"
			>
				{chats.map(
					(chat: { prompt: string; response: string }, index) => (
						<div key={index} className="mb-2">
							<div className="p-2 flex justify-end gap-2">
								<div className="max-w-[85%] text-white px-4 py-2 border border-gray-400 rounded-md">
									<p>{chat.prompt}</p>
								</div>
								<div className="w-[28px] rounded-full overflow-hidden">
									<Image
										src={userImage!}
										alt="user-image"
										width={20}
										height={20}
										className="w-full rounded-full"
									/>
								</div>
							</div>

							<div className="p-2 flex justify-start gap-2">
								<div className="w-[28px] rounded-full overflow-hidden">
									<Image
										src={"/logo.jpeg"}
										alt="user-image"
										width={20}
										height={20}
										className="w-full rounded-full"
									/>
								</div>
								<div className="bg-[#251e595d] max-w-[85%] px-4 py-2 border border-gray-400 rounded-md">
									{/* <p
										dangerouslySetInnerHTML={{
											__html: chat.response,
										}}
									></p> */}
									<Markdown
										className={
											"leading-relaxed text-gray-200"
										}
										remarkPlugins={[remarkGfm]}
									>
										{chat.response}
									</Markdown>
								</div>
							</div>
						</div>
					)
				)}

				{loading && <ChatLoader userImage={userImage!} />}
			</div>

			<div className="fixed bottom-6 w-full md:w-[60%] px-2">
				<InputPrompt
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					handleSubmit={handleSend}
					loading={loading}
				/>
			</div>
		</section>
	);
};

export default ChatIdPage;
