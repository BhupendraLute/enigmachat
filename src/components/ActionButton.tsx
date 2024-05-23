'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const ActionButton = ({ id }: { id: string }) => {
	const menuRef = useRef<HTMLDivElement>(null);

	const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

	const handleClickOutside = (event: any) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsActionMenuOpen(false);
		}
	};


	const handleRename = () => {
		// Implement logic to trigger onRename prop function (e.g., prompt for new name)
		setIsActionMenuOpen(false);
	};

	const handleDelete = () => {
		// Implement logic to trigger onDelete prop function (e.g., confirmation prompt)
		setIsActionMenuOpen(false);
	};

	// handle clicks on html document
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative">
			<button
				className="flex items-center justify-center hover:bg-slate-700 py-2 px-4 rounded-full transition-all duration-75 ease-in-out"
				onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
			>
				<Image
					src={"/svg/action-icon.svg"}
					alt="action-icon"
					width={5}
					height={5}
				/>
			</button>

			{isActionMenuOpen && (
				<div
					className="p-2 absolute top-10 right-4 z-[2] flex flex-col gap-2 bg-gray-800 shadow-md rounded-md text-sm"
					ref={menuRef}
				>
					<button
						className="py-1 px-4 hover:bg-gray-700 rounded flex items-center justify-between gap-1"
						onClick={handleRename}
					>
						Rename{" "}
						<Image
							src={"/svg/rename.svg"}
							alt="rename-icon"
							width={20}
							height={5}
						/>
					</button>

					<button
						className="py-1 px-4 hover:bg-gray-700 rounded flex items-center justify-between gap-1"
						onClick={handleDelete}
					>
						Delete{" "}
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
