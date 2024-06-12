"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import ActionButton from "./ActionButton";
import { deleteChat, renameChat } from "@/utils/chatActions";
import { useAppDispatch } from "@/store/store";
import { deleteChatFromList, renameChatfromList } from "@/store/slices/allChatsListSlice";
import { useParams, usePathname, useRouter } from "next/navigation";

type SidebarTabPropsType = {
	icon: string;
	title: string;
	onClickTab?: () => void;
	action?: boolean;
	id?: string;
	isSidebarExpanded?: boolean;
};

const SidebarTab = ({
	icon,
	title,
	isSidebarExpanded = true,
	action = false,
	id,
	onClickTab,
}: SidebarTabPropsType) => {
	const dispatch = useAppDispatch();

	const params = useParams();
	const pathname = usePathname()
	const router = useRouter()

	const deleteHandler = async () => {
		const confirm = window.confirm("Are you sure? Confirm to delete chat.");
		if (confirm) {
			const chatDeleted = await deleteChat(id);
			if (chatDeleted) {
				dispatch(deleteChatFromList(id));

				const urlId = pathname.split('/').pop()
				if(params.id == urlId) {
					router.replace('/chat')
				}
			}
		}
	};

	const renameHandler = async() => {
		let title: any = prompt("Enter new title: ")?.toString();
		if (title) {
			const chatRenamed = await renameChat(id, title);
			if(chatRenamed) {
				dispatch(renameChatfromList({id, title}))
			}
		}
	};

	return (
		<div className="flex justify-between items-center gap-1 py-1 px-2 hover:bg-slate-600 rounded-full cursor-pointer transition-all duration-700">
			<button
				className="w-full flex justify-start items-center text-base gap-2"
				onClick={onClickTab}
			>
				<Image
					src={icon}
					alt="tab-icon"
					width={16}
					height={16}
					className="w-[20px]"
				/>{" "}
				{isSidebarExpanded && <span className="truncate">{title}</span>}
			</button>
			{action && id && (
				<ActionButton
					renameHandler={renameHandler}
					deleteHandler={deleteHandler}
				/>
			)}
		</div>
	);
};

export default SidebarTab;
