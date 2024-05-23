"use client";

import Image from "next/image";

type InputPromptProps = {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	loading?: boolean;
};

const InputPrompt = ({
	value,
	onChange,
	handleSubmit,
	loading,
}: InputPromptProps) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
			className="w-full md:w-[80%] flex items-center justify-between gap-2 mx-auto border-2 border-gray-300 py-2 px-4 md:py-4 md:px-4 rounded-3xl"
		>
			<input
				value={value}
				onChange={onChange}
				className="outline-none focus-visible:outline-none bg-transparent max-h-64 min-h-fit w-full"
				aria-label="Enter a prompt here"
				placeholder="Enter a prompt here"
			/>

			<button type="submit" disabled={loading}>
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
