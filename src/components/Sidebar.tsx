"use client";
import Image from "next/image";
import SidebarTab from "./SidebarTab";
import { useEffect, useState } from "react";
import cn from "clsx";
import { getAllChatsByUser } from "@/utils/chatActions";
import { usePathname, useRouter } from "next/navigation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { setChatList } from "@/store/slices/allChatsListSlice";

const Sidebar = () => {

	const router = useRouter()
	const pathname = usePathname()

	const dispatch = useAppDispatch();

	const chatList : any = useAppSelector((state: RootState) => state.chatslist.chats);

	const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

	const handleHamburger = () => {
		setIsSidebarExpanded(!isSidebarExpanded);
	};

	const handleClickTab = (id: any)=> {
		// console.log("Running with id:", id);
		router.push(`/chat/${id}`)
	}

	useEffect(() => {
		try {
			const getChatList = async () => {
				const loadedChats = await getAllChatsByUser();
				const { chatData, successMessage, errorMessage }: any =
					loadedChats;

				if(chatData) {
					dispatch(setChatList(chatData))
				}
			};
			getChatList();
		} catch (error) {
			console.log(error);
		}
	}, []);

	

	return (
		<section
			id="sidebar"
			className="hidden md:w-fit max-w-[14rem] md:block bg-gray-800 text-white transition-all duration-700 border-r-2 border-gray-500"
		>
			<section className="p-2">
				<button
					className="w-[32px] flex items-center gap-1 overflow-hidden cursor-pointer bg-gray-700 rounded-full shadow-sm p-2"
					onClick={handleHamburger}
				>
					<Image
						src={"/svg/menu-icon.svg"}
						alt="menu-icon"
						width={22}
						height={22}
						priority
						className="rounded-full w-full"
					/>
				</button>

				<button
					onClick={()=> router.replace('/chat')}
					className={cn(
						"w-fit px-2 mt-12 flex items-center justify-start gap-2 bg-gray-700 hover:bg-gray-600 rounded-full cursor-pointer transition-[width] duration-75 text-base",
						{
							"py-2": !isSidebarExpanded,
							"py-1": isSidebarExpanded,
						}
					)}
					disabled={pathname === "/chat"}
				>
					<Image
						src={"/svg/plus.svg"}
						alt="new-chat-icon"
						width={12}
						height={12}
						className="w-[16px] h-[16px] rounded-full"
					/>
					<span
						className={cn("px-2 cursor-pointer text-base", {
							hidden: !isSidebarExpanded,
							flex: isSidebarExpanded,
						})}
					>
						New Chat
					</span>
				</button>

				<div className="h-full">
					<div
						className={cn("flex-col mt-8", {
							hidden: !isSidebarExpanded,
							flex: isSidebarExpanded,
						})}
					>
						<h3 className="text-xl font-semibold">Recent Chats</h3>
						<ul className="mt-2 ml-2 py-2 flex flex-col gap-2 text-base h-full max-h-[45vh] overflow-y-scroll custom-scrollbar">
							{chatList.length > 0 ? chatList.map((item: any, index: any) => (
								<li
									key={index}
									className="w-full rounded-md px-1"
								>
									<SidebarTab
										icon={"/svg/chat.svg"}
										title={item.title}
										action={true}
										id={item._id}
										onClickTab={()=> handleClickTab(item._id)}
									/>
								</li>
							)): "No recent Chats"}
						</ul>
					</div>
				</div>

				<div className="absolute bottom-1 py-2">
					<ul className="w-full py-1 flex flex-col gap-2 ">
						<SidebarTab
							icon={"/svg/help.svg"}
							title={"Feedback"}
							isSidebarExpanded={isSidebarExpanded}
						/>
						{/* <SidebarTab
							icon={"/svg/bell.svg"}
							title={"Activity"}
							isSidebarExpanded={isSidebarExpanded}
						/>
						<SidebarTab
							icon={"/svg/setting.svg"}
							title={"Settings"}
							isSidebarExpanded={isSidebarExpanded}
						/> */}
					</ul>
				</div>
			</section>
		</section>
	);
};

export default Sidebar;
