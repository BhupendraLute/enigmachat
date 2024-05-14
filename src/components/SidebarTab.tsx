"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

type SidebarTabPropsType = {
	icon: string;
	title: string;
	onClickTab?: () => void;
	action?: boolean;
	isSidebarExpanded?: boolean;
};

const SidebarTab = ({
	icon,
	title,
	action = false,
	isSidebarExpanded = true,
}: SidebarTabPropsType) => {
	const menuRef = useRef<HTMLDivElement>(null);

	const [isContentEditable, setIsContentEditable] = useState(false);
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
	}, [isActionMenuOpen]);

	const handleRename = () => {
		// Implement logic to trigger onRename prop function (e.g., prompt for new name)
		setIsActionMenuOpen(false);
	};

	const handleDelete = () => {
		// Implement logic to trigger onDelete prop function (e.g., confirmation prompt)
		setIsActionMenuOpen(false);
	};

	return (
		<li className="flex items-center gap-2 hover:bg-slate-600 py-1 px-2 rounded-full cursor-pointer transition-all duration-200 relative group">
			<Image
				src={icon}
				alt="tab-icon"
				width={18}
				height={18}
				className="w-5 h-5"
			/>{" "}
			{isSidebarExpanded && (
				<span className="truncate" contentEditable={isContentEditable}>
					{title}
				</span>
			)}
			{action && (
				<>
					<button
						className="opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-slate-800 py-2 px-3 rounded-full transition-all duration-75 ease-in-out"
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
							className="p-2 absolute top-8 right-4 z-[2] flex flex-col gap-2 bg-gray-800 shadow-md rounded-md text-sm"
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
				</>
			)}
		</li>
	);
};

export default SidebarTab;
