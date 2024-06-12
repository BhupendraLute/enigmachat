"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import SidebarTab from "./SidebarTab";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { getAllChatsByUser } from "@/utils/chatActions";
import { setChatList } from "@/store/slices/allChatsListSlice";
import cn from "clsx";

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

	const router = useRouter();
	const pathname = usePathname();
	const isNewChatPage = pathname === "/chat";

	const dispatch = useAppDispatch();

	const chatList = useAppSelector(
		(state: RootState) => state.chatslist.chats
	);

	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const setUpProviders = async () => {
			const response: any = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);

	useEffect(() => {
		try {
			const getChatList = async () => {
				const loadedChats = await getAllChatsByUser();
				const { chatData, successMessage, errorMessage }: any =
					loadedChats;

				if (chatData) {
					dispatch(setChatList(chatData));
				}
			};
			getChatList();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleLogout = () => {
		signOut();
	};

	const handleClickTab = (id: any) => {
		// console.log("Running with id:", id);
		router.push(`/chat/${id}`);
	};

	const handleHamburger = () => {
		const sidebar = document.getElementById("sidebar");
		setIsSidebarExpanded((prev) => !prev);
	};

	const handleClickOutside = (event: any) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsSidebarExpanded((prev) => !prev);
		}
	};

	// handle clicks on html document
	useEffect(() => {
		if (isSidebarExpanded) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [isSidebarExpanded]);

	return (
		<nav className="w-full py-2 px-4 md:px-6 bg-gray-800 text-white">
			<div className="w-full flex justify-between items-center">
				{/* Left nav */}
				<div className="flex items-center gap-2">
					{/* Hamburger */}
					<button
						className="md:hidden w-8 h-8 flex items-center gap-1 overflow-hidden cursor-pointer bg-gray-700 rounded-full shadow-sm p-1"
						onClick={handleHamburger}
					>
						<Image
							src={"/svg/menu-icon.svg"}
							alt="menu-icon"
							width={16}
							height={16}
							priority
							className="rounded-full w-full h-full"
						/>
					</button>

					{/* Logo */}
					<h1 className="max-md:hidden p-1 flex items-center gap-2">
						<Image
							src={"/logo.jpeg"}
							alt="menu-icon"
							width={22}
							height={22}
							priority
							className="rounded-full w-[32px] h-[32px]"
						/>
						<span className="text-gray-100">EnigmaChat</span>
					</h1>
				</div>

				{/* Right nav */}
				<div className="flex items-center gap-4 pr-1">
					{/* New chat button */}
					<button
						className="w-6 h-6 p-[2px] md:hidden flex items-center justify-start gap-2 bg-gray-700 rounded-full text-base"
						onClick={() => router.replace("/chat")}
						disabled={isNewChatPage}
					>
						<Image
							src={"/svg/plus.svg"}
							alt="new-chat-icon"
							width={12}
							height={12}
							className="w-full h-full"
						/>
					</button>

					{/* User Profile button */}
					{session?.user ? (
						<div className="flex gap-3 md:gap-5">
							<button
								className="btn-primary rounded-full text-sm px-2 py-1"
								type="button"
								onClick={() => handleLogout()}
							>
								Logout
							</button>

							<button className="w-8 h-8 cursor-pointer border-2 border-white rounded-full overflow-hidden">
								<Image
									src={session?.user.image!}
									alt="Profile Image"
									width={37}
									height={37}
									className="rounded-full w-full h-full"
								/>
							</button>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map(
									(provider: any) => (
										<button
											type="button"
											key={provider.name}
											onClick={() => signIn(provider.id)}
											className="btn-primary rounded-full text-sm px-2 py-1"
										>
											Sign In
										</button>
									)
								)}
						</>
					)}
				</div>
			</div>

			{/* Sidebar from below midiun screens device */}
			<div
				ref={menuRef}
				id="sidebar"
				className={cn(
					"absolute hidden max-md:block h-[85%] top-0 px-2 py-1 bg-gray-700 z-40 transition-all duration-800",
					{
						"left-0": isSidebarExpanded,
						"-left-full": !isSidebarExpanded,
					}
				)}
			>
				<button
					className="w-[32px] flex items-center gap-1 overflow-hidden cursor-pointer bg-gray-700 rounded-full shadow-sm p-2 ml-2"
					onClick={handleHamburger}
				>
					<strong className="text-2xl">X</strong>
				</button>

				<div className="h-full">
					<div className={"flex flex-col mt-8"}>
						<h3 className="text-[1rem] font-semibold">
							Recent Chats
						</h3>
						<ul className="mt-2 ml-2 py-2 flex flex-col gap-2 text-sm h-full max-h-[45vh] overflow-y-scroll custom-scrollbar">
							{chatList.length > 0 &&
								chatList.map((item, index) => (
									<li
										key={index}
										className="w-full rounded-md px-1"
									>
										<SidebarTab
											icon={"/svg/chat.svg"}
											title={item.title}
											action={true}
											id={item._id}
											onClickTab={() =>
												handleClickTab(item._id)
											}
										/>
									</li>
								))}
						</ul>
					</div>
				</div>

				<div className="absolute bottom-1 py-2 mt-8">
					<ul className="w-full py-1 flex flex-col gap-2 ">
						<SidebarTab icon={"/svg/help.svg"} title={"Feedback"} />
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
			</div>
		</nav>
	);
};

export default Navbar;
