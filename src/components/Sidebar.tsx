"use client";
import Image from "next/image";
import SidebarTab from "./SidebarTab";

const Sidebar = () => {
	return (
		<aside
			id="sidebar"
			className="hidden md:w-fit lg:w-60 md:block bg-gray-800 text-white"
		>
			<section className="p-2">
				<div className="w-fit flex items-center gap-1 overflow-hidden cursor-pointer">
					<Image
						src={"/logo.jpeg"}
						alt="menu-icon"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<span className="max-md:hidden px-2 py-1">EnigmaChat</span>
				</div>

				<div className="w-fit p-2 mt-8 flex items-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-full shadow shadow-black cursor-pointer transition-all duration-75">
					<Image
						src={"/svg/plus.svg"}
						alt="menu-icon"
						width={18}
						height={18}
					/>
					<span className="max-lg:hidden px-2 cursor-pointer">
						New Chat
					</span>
				</div>

				<div className="md:flex flex-col mt-8">
					<h3 className="text-xl font-semibold">Recents</h3>
					<ul className="mt-2 ml-4 py-2 px-1 flex flex-col gap-2 h-[48vh] overflow-y-scroll custom-scrollbar">
						<SidebarTab
							icon={"/svg/chat.svg"}
							title={"Fisrt ChatChatChatChat"}
							action={true}
						/>
					</ul>
				</div>

				<div className="py-4 px-1">
					<ul className="py-2 px-1 flex flex-col gap-2 ">
						<SidebarTab icon={"/svg/help.svg"} title={"Help"} />
						<SidebarTab icon={"/svg/bell.svg"} title={"Activity"} />
						<SidebarTab
							icon={"/svg/setting.svg"}
							title={"Settings"}
						/>
					</ul>
				</div>
			</section>
		</aside>
	);
};

export default Sidebar;
