"use client";
import Image from "next/image";
import SidebarTab from "./SidebarTab";
import { useState } from "react";
import cn from "clsx";

const Sidebar = () => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

	const handleHamburger = () => {
		setIsSidebarExpanded(!isSidebarExpanded);
	};

	return (
		<aside
			id="sidebar"
			className="hidden md:w-fit max-w-[15rem] md:block bg-gray-800 text-white transition-all duration-500 border-r-2 border-gray-500"
		>
			<section className="p-2">
				<button
					className="w-fit flex items-center gap-1 overflow-hidden cursor-pointer bg-gray-700 rounded-full shadow-sm p-2"
					onClick={handleHamburger}
				>
					<Image
						src={"/svg/menu-icon.svg"}
						alt="menu-icon"
						width={22}
						height={22}
						priority
						className="rounded-full"
					/>
				</button>

				<button className="w-fit p-2 mt-8 flex items-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-full shadow shadow-black cursor-pointer transition-all duration-75">
					<Image
						src={"/svg/plus.svg"}
						alt="menu-icon"
						width={18}
						height={18}
					/>
					<span
						className={cn("px-2 cursor-pointer", {
							hidden: !isSidebarExpanded,
							flex: isSidebarExpanded,
						})}
					>
						New Chat
					</span>
				</button>

				<div
					className={cn("flex-col mt-8", {
						hidden: !isSidebarExpanded,
						flex: isSidebarExpanded,
					})}
				>
					<h3 className="text-xl font-semibold">Recents</h3>
					<ul className="mt-2 ml-4 py-2 px-1 flex flex-col gap-2 h-[48vh] overflow-y-scroll custom-scrollbar">
						<SidebarTab
							icon={"/svg/chat.svg"}
							title={"Fisrt ChatChatChatChat"}
							action={true}
						/>
					</ul>
				</div>

				<div className="absolute bottom-1 py-4">
					<ul className="py-2 px-1 flex flex-col gap-2 ">
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
