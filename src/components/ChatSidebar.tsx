"use client";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { getAllChatsByUser } from "@/utils/chatActions";
import ChatItem from "./ChatItem";
import { PlusIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export function ChatSidebar() {
	const router = useRouter();
	const pathname = usePathname();

	const [chatList, setChatList] = useState([]);

	useEffect(() => {
		const fetchChats = async () => {
			const result = await getAllChatsByUser();
			if (result && result.chatData) {
				setChatList(result.chatData);
			}
		};
		fetchChats();
		
	}, [pathname]);

	const handleLogout = async() => {
			await signOut();
			router.push("/chat");
		};

	return (
		<Sidebar className="bg-[#1F2937]">
			<SidebarHeader className="bg-[#1F2937]">
				<Link
					href={"/"}
					className="text-2xl text-white font-semibold mb-4 flex items-center gap-2"
				>
					<Image
						src={"/logo.jpeg"}
						alt=""
						width={40}
						height={40}
						className="rounded-full"
					/>
					<span>EnigmChat</span>
				</Link>

				{/* New Chat Button */}
				<Link href="/chat" className="mb-4 w-fit">
					<Button className="bg-gray-700 hover:bg-gray-900 rounded-full px-3 py-1">
						<PlusIcon />
						New Chat
					</Button>
				</Link>
			</SidebarHeader>
			<SidebarContent className="bg-[#1F2937]">
				<SidebarGroup className="px-2 py-4">
					<SidebarGroupLabel className="text-2xl text-white mb-1">
						Recent
					</SidebarGroupLabel>
					{chatList && chatList.length > 0
						? chatList.map((chat: any) => (
								<ChatItem key={chat._id} chat={chat} />
						  ))
						: null}
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="bg-[#1F2937] pb-4">
				<Button
					className="bg-gray-700 hover:bg-gray-900 rounded-full px-2 py-1"
					type="button"
					onClick={() => handleLogout()}
				>
					Logout
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
