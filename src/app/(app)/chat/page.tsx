"use client";
import InputPrompt from "@/components/InputPrompt";
import { save } from "@/store/slices/promptSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleSend = async () => {
		dispatch(save(prompt))
			router.push(`/chat/${prompt.slice(0, 10)}`);
	};

	return (
		<section className="mt-4 md:mt-6 flex flex-col gap-4 items-center">
			
				<div className="p-4 w-full md:w-[65%]">
					<h1 className="py-2 w-fit text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 via-purple-400 bg-clip-text backdrop-blur-md text-transparent">
						Hello, <span className="truncate">User</span>
					</h1>
					<p className="text-slate-400 text text-2xl md:text-3xl p-4">
						How can I help you today?
					</p>
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

export default ChatPage;
