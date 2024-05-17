"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

type InputPromptProps = {
	onSubmit: (value: string) => void;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const InputPrompt = ({ onSubmit, onChange }: InputPromptProps) => {
	const [isEmpty, setIsEmpty] = useState(true);
	const textareaRef = useRef<HTMLTextAreaElement>(null);


	useEffect(() => {
		const handleChange = () => {
			setIsEmpty(textareaRef.current?.value.trim() === "");
		};

		textareaRef.current?.addEventListener("change", handleChange);

		return () => {
			textareaRef.current?.removeEventListener("change", handleChange);
		};
	}, [textareaRef]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(textareaRef.current?.value || "");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full p-4 flex justify-between items-center gap-2 overflow-hidden resize-none border-2 border-gray-400 rounded-[2rem]"
		>
			<textarea
				ref={textareaRef}
				onChange={onChange}
				className="outline-none focus-visible:outline-none bg-transparent max-h-64 min-h-fit w-full"
				aria-label="Enter a prompt here"
				placeholder="Enter a prompt here"
				rows={1}
			/>

			<button type="submit">
				<Image
					src={"/svg/plane.svg"}
					alt="submit-button"
					width={24}
					height={34}
				/>
			</button>
		</form>
	);
};

export default InputPrompt;
