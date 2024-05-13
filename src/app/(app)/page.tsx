import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

				<div className="flex items-center">
					<Link href={"/"} className="btn-primary rounded-md">
						Sign in
					</Link>
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

					<div className="w-full text-s mt-8">
						<Link
							href={"/"}
							className="btn-primary rounded-full shadow-lg shadow-blue-400 hover:shadow-sm"
						>
							Sign in
						</Link>
					</div>
				</div>

				{/* right hero */}
				<div className="w-full max-md:h-full relative ">
					<div
						className="relative inset-0 w-[80%] h-80 max-md:w-full bg-cover  bg-center bg-no-repeat rounded-lg bg-clip shadow-md ring-1 ring-gray-200"
						style={{ backgroundImage: "url('/hero-image1.jpg')" }}
					>
						{/* chats container */}
						<div className="absolute h-full w-full max-md:flex max-md:flex-col gap-8 p-2">
							{/* chat card */}
							<div className="md:w-56 max-h-32 md:absolute md:top-7 md:right-40 flex gap-2 shadow-md ring-1 ring-gray-100 bg-gray-100 rounded-lg">
								<div className="p-2">
									<div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gray-400 shadow-md shadow-[#00000077]">
										<Image
											src={"/avatar-image1.png"}
											alt="avatar-image"
											width={50}
											height={50}
											className="w-full"
										/>
									</div>
								</div>
								<div className="w-full p-1 text-start overflow-hidden">
									Rewrite this email draft to make it more
									clear and concise
								</div>
							</div>

							{/* chat card */}
							<div className="md:w-64 max-h-32 md:absolute md:-bottom-8  md:-right-14 flex gap-2 shadow-md ring-1 ring-gray-100 bg-gray-100 rounded-lg">
								<div className="w-full p-1 overflow-hidden">
									Sure, here is a more clear and concise
									version of your email draft: Dear Professor
									[Professor’s name], Congratulations on your
									Teaching Excellence Award! I am so...
								</div>

								<div className="p-2">
									<div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-gray-400 shadow-md shadow-[#00000077]">
										<Image
											src={"/logo.jpeg"}
											alt="avatar-image"
											width={50}
											height={50}
											className="w-full"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
