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

const ChatItem = ({ chat }: any) => {
	return (
		<SidebarMenuItem
			key={chat._id}
			className="hover:bg-[#374151] text-white text-xl rounded-sm"
		>
			<SidebarMenuButton className="hover:bg-transparent hover:text-white py-1" asChild>
				<Link href={`/chat/${chat._id}`} className="text">
					<MessageSquare /> <span>{chat.title}</span>
				</Link>
			</SidebarMenuButton>
			<DropdownMenu>
				<DropdownMenuTrigger className="text-white hover:text-white hover:bg-[#1F2937]" asChild>
					<SidebarMenuAction>
						<MoreHorizontal />
					</SidebarMenuAction>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-[#374151] text-white" side="right" align="start">
					<DropdownMenuItem className="hover:bg-transparent">
						<Button variant={"ghost"}><Edit />Rename</Button>
					</DropdownMenuItem>
					<DropdownMenuItem>
					<Button variant={"ghost"}><Trash />Delete</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarMenuItem>
	);
};

export default ChatItem;
