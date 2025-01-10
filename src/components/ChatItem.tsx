import React from "react";
import {
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Edit, MessageSquare, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/store/store";
import { deleteChat, renameChat } from "@/utils/chatActions";
import { deleteChatFromList, renameChatfromList } from "@/store/slices/allChatsListSlice";
import { useParams, usePathname, useRouter } from "next/navigation";

const ChatItem = ({ chat }: any) => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const pathname = usePathname()
	const router = useRouter()

	const handleDelete = async (e : any) => {
		e.preventDefault();
		const confirmDelete = window.confirm("Are you sure?")

		if (confirmDelete) {
			const chatDeleted = await deleteChat(chat._id);
			if (chatDeleted) {
				dispatch(deleteChatFromList(chat._id));

				const urlId = pathname.split('/').pop();
				if(params.id == urlId) {
					router.replace('/chat');
				} else {
					window.location.reload();
				}
			}
		}
	};

	const renameHandler = async() => {
		let title: any = prompt("Enter new title: ")?.toString();
		const id = chat._id;
		if (title) {
			const chatRenamed = await renameChat(chat._id, title);
			if(chatRenamed) {
				dispatch(renameChatfromList({id, title}))
				window.location.reload();
			}
		}
	};

	return (
		<SidebarMenuItem
			key={chat._id}
			className="hover:bg-[#374151] text-white text-xl rounded-sm"
		>
			<SidebarMenuButton
				className="hover:bg-transparent hover:text-white py-1"
				asChild
			>
				<Link href={`/chat/${chat._id}`} className="text">
					<MessageSquare /> <span>{chat.title}</span>
				</Link>
			</SidebarMenuButton>
			<DropdownMenu>
				<DropdownMenuTrigger
				onClick={(e)=>e.preventDefault()}
					className="text-white hover:text-white hover:bg-[#1F2937]"
					asChild
				>
					<SidebarMenuAction>
						<MoreHorizontal />
					</SidebarMenuAction>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="bg-[#374151] text-white"
					side="right"
					align="start"
				>
					<DropdownMenuItem onClick={renameHandler} className="hover:bg-transparent">
						<Button variant={"ghost"}>
							<Edit />
							Rename
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleDelete}>
							<Button variant={"ghost"}>
								<Trash />
								Delete
							</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarMenuItem>
	);
};

export default ChatItem;
