"use client";
import InputPrompt from "@/components/InputPrompt";
import getGeminiResponse from "@/config/gemini-config";
import { useAppSelector } from "@/store/store";
import React, { useEffect, useState } from "react";

const ChatIdPage = () => {
	const { responses, loading, error } = useAppSelector((state) => state.chat);
	const [prompt, setPrompt] = useState("");

	useEffect(() => {
		
	}, [responses, loading, error]);

	return (
		<section className="mt-4 mx-3 md:mt-6 flex flex-col gap-4 items-center">
			<div className="p-4 w-full md:w-[65%] bg-gray-700 overflow-y-scroll h-[calc(100vh-12rem)] rounded-lg custom-scrollbar">
				
			</div>

		</section>
	);
};

export default ChatIdPage;
