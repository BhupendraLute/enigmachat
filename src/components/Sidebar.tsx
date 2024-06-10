"use client";
import Image from "next/image";
import SidebarTab from "./SidebarTab";
import { useState } from "react";
import cn from "clsx";
import Link from "next/link";

const Sidebar = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

	const handleHamburger = () => {
		setIsSidebarExpanded(!isSidebarExpanded);
	};

	return (
		<aside
			id="sidebar"
			className="hidden md:w-fit max-w-[14rem] md:block bg-gray-800 text-white transition-all duration-500 border-r-2 border-gray-500"
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

				<Link
					href={"/chat"}
					className={cn(
						"w-fit px-2 mt-12 flex items-center justify-start gap-2 bg-gray-700 hover:bg-gray-600 rounded-full cursor-pointer transition-[width] duration-75 text-base",
						{
							"py-2": !isSidebarExpanded,
							"py-1": isSidebarExpanded,
						}
					)}
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
				</Link>

				<div className="h-full">
					<div
						className={cn("flex-col mt-8", {
							hidden: !isSidebarExpanded,
							flex: isSidebarExpanded,
						})}
					>
						<h3 className="text-xl font-semibold">Recents</h3>
						<ul className="mt-2 ml-2 py-2 px-1 flex flex-col gap-2 text-base h-full max-h-[45vh] overflow-y-scroll custom-scrollbar">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9,15,8547,8,7,987,9,79,7,9,7,97,,9].map((item, index) => (
								<li className="w-full rounded-md px-1">
									<SidebarTab
										icon={"/svg/chat.svg"}
										title={"Fisrt ChatChatChatChat"}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="absolute bottom-1 py-2">
					<ul className="w-full py-1 flex flex-col gap-2 ">
						<SidebarTab
							icon={"/svg/help.svg"}
							title={"Help"}
							isSidebarExpanded={isSidebarExpanded}
						/>
						<SidebarTab
							icon={"/svg/bell.svg"}
							title={"Activity"}
							isSidebarExpanded={isSidebarExpanded}
						/>
						<SidebarTab
							icon={"/svg/setting.svg"}
							title={"Settings"}
							isSidebarExpanded={isSidebarExpanded}
						/>
					</ul>
				</div>
			</section>
		</aside>
	);
};

export default Sidebar;
