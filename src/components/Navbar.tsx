"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import { usePathname } from "next/navigation";
import { getProviders, signOut, useSession } from "next-auth/react";

const Navbar = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);

	const pathname = usePathname();
	const isChatPage = pathname.startsWith("/chat/");

	const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response: any = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);

	const handleLogout = () => {
		signOut();
	};

	const handleRename = () => {
		// Implement logic to trigger onRename prop function (e.g., prompt for new name)
		setIsActionMenuOpen(false);
	};

	const handleDelete = () => {
		// Implement logic to trigger onDelete prop function (e.g., confirmation prompt)
		setIsActionMenuOpen(false);
	};

	return (
		<nav className="w-full py-2 px-4 md:px-6 bg-gray-800 text-white">
			<div className="w-full flex justify-between items-center">
				{/* Left nav */}
				<div className="flex items-center gap-2">
					{/* Hamburger */}
					<button className="md:hidden w-8 h-8 flex items-center gap-1 overflow-hidden cursor-pointer bg-gray-700 rounded-full shadow-sm p-1">
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
					<button className="w-6 h-6 p-[2px] md:hidden flex items-center justify-start gap-2 bg-gray-700 rounded-full text-base">
						<Image
							src={"/svg/plus.svg"}
							alt="new-chat-icon"
							width={12}
							height={12}
							className="w-full h-full"
						/>
					</button>

					{/* User Profile button */}
					{session?.user && (
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
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
