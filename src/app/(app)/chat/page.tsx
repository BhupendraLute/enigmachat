"use client";
import InputPrompt from "@/components/InputPrompt";
import React, { useState } from "react";

const ChatPage = () => {
	const [promptValue, setPromptValue] = useState("");
	return (
		<section className="mt-4 md:mt-6 flex flex-col gap-4 items-center">
			<div className="p-4 w-full md:w-[65%]">
				<h1 className="py-2 w-fit text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400  via-purple-400  bg-clip-text backdrop-blur-md text-transparent">
					Hello, <span className="truncate">User</span>
				</h1>
				<p className="text-slate-400 text text-2xl md:text-3xl p-4">
					How can I help you today?
				</p>
			</div>

			<div className="fixed bottom-6 w-full md:w-[60%] px-2">
				<InputPrompt
					onChange={(e) => {
						setPromptValue(e.target.value);
					}}
					onSubmit={(value) => {}}
				/>
			</div>
		</section>
	);
};

export default ChatPage;
