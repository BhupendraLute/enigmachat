"use client";
import { Button } from "@/components/ui/button";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
		<main className="bg-gray-800">
			<nav className="flex justify-between items-center py-3 px-4 md:px-6 shadow-md shadow-gray-700">
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
						<span className="text-2xl text-gray-100">
							EnigmaChat
						</span>
					</h1>
				</div>

				<div className="">
					{session?.user ? (
						<div className="flex gap-3 md:gap-5">
							<button
								className="btn-primary rounded-full shadow-lg hover:shadow-sm"
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
								Object.values(providers).map(
									(provider: any) => (
										<button
											type="button"
											key={provider.name}
											onClick={() => signIn(provider.id)}
											className="btn-primary py-2 px-4 rounded-full shadow-lg hover:shadow-sm"
										>
											Sign In
										</button>
									)
								)}
						</>
					)}
				</div>
			</nav>

			<section className="py-8 px-2 md:px-8 w-full xl:w-10/12  flex flex-col items-center justify-center mx-auto">
				{/* left hero */}
				<div className="flex flex-col items-start justify-center pt-12 pb-8 px-4 text-center max-md:my-auto">
					<h1 className="bg-gradient-to-l bg-clip-text text-transparent to-blue-400 from-blue-600 text-5xl md:text-6xl font-extrabold py-4 mx-auto">
						EnigmaChat
					</h1>
					<p className="text-gray-100 font-semibold text-2xl leading-tight mx-auto">
						Unlock the Power of Conversational AI
					</p>
					<p className="text-gray-100 font-semibold mt-8 mx-auto">
						Chat to start writing, planning, learning and more with
						EnigmaChat
					</p>
					<p className="bg-gradient-to-l bg-clip-text text-transparent to-blue-400 from-blue-600 text-2xl font-semibold mt-8 mx-auto border border-blue-600 rounded-lg px-8 py-4">
						Signin to get started
					</p>
				</div>
				{session?.user ? (
					null
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => (
								<Button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="btn-primary hover:bg-blue-800 py-3 px-6 text-xl"
								>
									Sign In
								</Button>
							))}
					</>
				)}
			</section>
		</main>
	);
}
