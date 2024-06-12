"use client";
import { deleteChat, renameChat } from "@/utils/chatActions";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const ActionButton = ({
	renameHandler,
	deleteHandler,
}: {
	renameHandler: () => void;
	deleteHandler: (id: any) => void;
}) => {
	const menuRef = useRef<HTMLDivElement>(null);

	const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

	const handleClickOutside = (event: any) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsActionMenuOpen(false);
		}
	};


	// handle clicks on html document
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className="w-[20px] h-[18px] flex items-center justify-center hover:bg-slate-700 rounded-full relative"
			onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
		>
			<Image
				src={"/svg/action-icon.svg"}
				alt="action-icon"
				width={5}
				height={5}
				className="w-full h-full"
			/>

			{isActionMenuOpen && (
				<div
					className="p-2 absolute top-6 right-2 z-[2] flex flex-col gap-2 bg-gray-800 shadow-md rounded-md text-sm ring-2 ring-gray-400 "
					ref={menuRef}
				>
					<button
						className="py-1 px-4 rounded flex items-center gap-1 hover:bg-gray-700"
						onClick={()=> {
							setIsActionMenuOpen(false);
							renameHandler();
						}}
					>
						<span>Rename</span>
						<Image
							src={"/svg/rename.svg"}
							alt="rename-icon"
							width={20}
							height={5}
						/>
					</button>

					<button
						className="py-1 px-4 rounded flex items-center gap-1 hover:bg-gray-700"
						onClick={deleteHandler}
					>
						<span>Delete</span>
						<Image
							src={"/svg/delete.svg"}
							alt="rename-icon"
							width={20}
							height={20}
						/>
					</button>
				</div>
			)}
		</div>
	);
};

export default ActionButton;
