"use client";
import ChatLoader from "@/components/ChatLoader";
import InputPrompt from "@/components/InputPrompt";
import { createChat, deleteChat } from "@/store/slices/chatSlice";
import { useAppDispatch } from "@/store/store";
import { createNewChat } from "@/util/createChat";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
	const { data: session } = useSession();
	const userImage = session?.user?.image;

	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleSend = async () => {
		try {
			setLoading(true);
			if (prompt) {
				const newChat: any = await createNewChat(prompt);
				const { chatData, successMessage, errorMessage }: any = newChat;
				dispatch(deleteChat());
				dispatch(createChat(chatData));

				router.push(`/chat/${chatData._id}`);
			}
		} catch (error) {
			return false;
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="w-full relative mt-4 md:mt-6 flex flex-col gap-4 items-center">
			{!loading ? (
				<div className="p-4 w-full md:w-[65%]">
					<h1 className="py-2 w-fit text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 via-purple-400 bg-clip-text backdrop-blur-md text-transparent">
						Hello, <span className="truncate">User</span>
					</h1>
					<p className="text-slate-400 text text-2xl md:text-3xl p-4">
						How can I help you today?
					</p>
				</div>
			) : (
				<ChatLoader userImage={userImage!} />
			)}

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

export default ChatPage;
