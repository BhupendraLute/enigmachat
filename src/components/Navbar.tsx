"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import cn from "clsx";
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
				<div className="flex items-center gap-6">
					{/* Hamburger */}
					<button className="md:hidden w-fit flex items-center gap-1 overflow-hidden cursor-pointer bg-gray-700 rounded-full shadow-sm p-1">
						<Image
							src={"/svg/menu-icon.svg"}
							alt="menu-icon"
							width={16}
							height={16}
							priority
							className="rounded-full w-[26px] h-[26px]"
						/>
					</button>

					{/* Logo */}
					<h1 className="p-1 flex items-center gap-2">
						<Image
							src={"/logo.jpeg"}
							alt="menu-icon"
							width={22}
							height={22}
							priority
							className="rounded-full w-[36px] h-[36px]"
						/>
						<span className="max-md:hidden">EnigmaChat</span>
					</h1>
				</div>

				{/* Right nav */}
				<div className="flex items-center gap-4 pr-1">
					{/* New chat button */}
					<button className="md:hidden hover:bg-gray-600 rounded-full p-1">
						<Image
							src={"/svg/plus.svg"}
							alt="menu-icon"
							width={22}
							height={22}
							priority
							className="rounded-full w-[24px] h-[24px]"
						/>
					</button>

					{/* Chat action Button */}
					{isChatPage && <ActionButton id={""} />}

					{/* User Profile button */}
					{session?.user && (
						<div className="flex gap-3 md:gap-5">
							<button
								className="btn-primary rounded-full"
								type="button"
								onClick={() => signOut()}
							>
								Logout
							</button>

							<div className="cursor-pointer border-2 border-white rounded-full overflow-hidden">
								<Image
									src={session?.user.image!}
									alt="Profile Image"
									width={37}
									height={37}
									className="rounded-full"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
