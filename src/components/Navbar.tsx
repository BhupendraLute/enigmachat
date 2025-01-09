"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Navbar = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setUpProviders = async () => {
			const response: any = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);

	const handleLogout = async() => {
		await signOut();
	};

	return (
		<nav className="w-full py-2 bg-gray-800 text-white">
			<div className="w-full flex justify-between items-center">
				{/* Left nav */}
				<div className="flex items-center gap-2">
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
										<Button
											type="button"
											key={provider.name}
											onClick={() => signIn(provider.id)}
											className="btn-primary rounded-lg text-sm px-2 py-1"
										>
											Sign In
										</Button>
									)
								)}
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
