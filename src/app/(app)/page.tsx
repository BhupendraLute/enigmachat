"use client";
import { Provider } from "next-auth/providers/index";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setUpProviders = async () => {
			const response: any = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);
	return (
		<>
			<nav className="flex justify-between items-center py-3 px-4 md:px-6 shadow-md">
				<div className="overflow-hidden cursor-pointer">
					<h1 className="flex gap-2 font-extrabold">
						<div className="rounded-full overflow-hidden">
							<Image
								src={"/logo.jpeg"}
								alt="logo"
								width={32}
								height={32}
							/>
						</div>
						<span className="text-2xl text-gray-600">
							EnigmaChat
						</span>
					</h1>
				</div>

				<div className="">
					{session?.user ? (
						<div className="flex gap-3 md:gap-5">
							<button
								className="btn-primary rounded-full shadow-lg shadow-blue-400 hover:shadow-sm"
								type="button"
								onClick={() => signOut()}
							>
								Logout
							</button>

							<div>
								<Image
									src={session?.user.image!}
									alt="Profile Image"
									width={37}
									height={37}
									className="rounded-full"
								/>
							</div>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider : any) => (
									<button
										type="button"
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className="btn-primary py-2 px-4 rounded-full shadow-lg shadow-blue-400 hover:shadow-sm"
									>
										Sign In
									</button>
								))}
						</>
					)}
				</div>
			</nav>

			<section className="py-8 px-2 md:px-8 w-full xl:w-10/12 mx-auto flex md:justify-center gap-8 md:gap-10 max-md:flex-col-reverse">
				{/* left hero */}
				<div className="flex flex-col items-start justify-center py-12 px-4 md:py-28 text-center max-md:my-auto">
					<h1 className="bg-gradient-to-l bg-clip-text text-transparent to-blue-400 from-blue-600 text-5xl md:text-6xl font-extrabold py-4 mx-auto">
						EnigmaChat
					</h1>
					<p className="text-gray-600 font-semibold text-2xl leading-tight mx-auto">
						Unlock the Power of Conversational AI
					</p>
					<p className="text-gray-600 font-semibold mt-8 mx-auto">
						Chat to start writing, planning, learning and more with
						EnigmaChat
					</p>
					<p className="bg-gradient-to-l bg-clip-text text-transparent to-blue-400 from-blue-600 text-2xl font-semibold mt-8 mx-auto border border-blue-600 rounded-lg px-8 py4">
						Signin to get started
					</p>
				</div>
			</section>
		</>
	);
}
