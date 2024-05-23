"use client";
import InputPrompt from "@/components/InputPrompt";
import { fetchChatResponse } from "@/store/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ChatPage = () => {
	const dispatch = useAppDispatch();
	const { responses, loading, error } = useAppSelector((state) => state.chat);
	const [prompt, setPrompt] = useState("");
	const [show, setShow] = useState(true);

	const router = useRouter();

	const handleSend = () => {
		if (prompt.trim()) {
			dispatch(fetchChatResponse(prompt));
			setPrompt("");
			setShow(false);
		}
	};

	return (
		<section className="mt-4 md:mt-6 flex flex-col gap-4 items-center">
			{show && (
				<div className="p-4 w-full md:w-[65%]">
					<h1 className="py-2 w-fit text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 via-purple-400 bg-clip-text backdrop-blur-md text-transparent">
						Hello, <span className="truncate">User</span>
					</h1>
					<p className="text-slate-400 text text-2xl md:text-3xl p-4">
						How can I help you today?
					</p>
				</div>
			)}

			{!show && (
				<div className="p-4 w-full md:w-[65%] bg-gray-700 overflow-y-scroll h-[calc(100vh-12rem)] rounded-lg custom-scrollbar">
					{responses.map((response, index) => (
						<div key={index}>
							<p
								dangerouslySetInnerHTML={{ __html: response }}
							></p>
						</div>
					))}
					{error && <p className="text-red-500">{error}</p>}
					{loading && (
						<div className="loader">
							<hr />
							<hr />
							<hr />
						</div>
					)}
				</div>
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
