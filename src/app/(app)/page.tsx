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

			<section className="py-8 px-2 md:px-8 w-full md:w-11/12 mx-auto flex max-md:flex-col h-[calc(100vh-4rem)]">
				<div className="flex flex-col items-start py-12 px-4 md:py-28 text-center max-md:my-auto mx-8">
					<h1 className="bg-gradient-to-l bg-clip-text text-transparent to-blue-400 from-blue-600 text-5xl md:text-6xl font-extrabold py-4 px-1 mx-auto">
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

				<div className="max-md:hidden w-full relative py-4 pl-14">
					<div
						className="absolute ml-16 top-16 w-[60%] h-[50%] bg-cover  bg-center bg-no-repeat bg-red-50 rounded-lg overflow-hidden shadow-md ring-1 ring-gray-200"
						style={{ backgroundImage: "url('/hero-image1.jpg')" }}
					></div>

					{/* chats container */}
					<div className="absolute md:ml-16 bottom-16 right-16 mb-10 w-[40%] overflow-hidden  flex flex-col gap-2 items-start justify-stretch p-2">
						{/* chat card */}
						<div className="flex items-start justify-stretch shadow-md ring-1 ring-gray-100 bg-gray-100 rounded-lg mr-14">
							<div className="p-2">
								<div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gray-400 shadow-md shadow-[#00000077]">
									<Image
										src={"/avatar-image1.png"}
										alt="avatar-image"
										width={50}
										height={50}
										className="w-full"
									/>
								</div>
							</div>
							<div className="w-full max-h-[10rem] p-1 text-start truncate whitespace-normal">
								Rewrite this email draft to make it more clear
								and concise
							</div>
						</div>

						<div className="flex items-start justify-stretch shadow-md ring-1 ring-gray-100 bg-gray-100 rounded-lg  ml-14">
							<div className="w-full max-h-[12rem] p-1 text-start truncate whitespace-normal">
								Sure, here is a more clear and concise version
								of your email draft: Dear Professor [Professor’s
								name], Congratulations on your Teaching
								Excellence Award! I am so...
							</div>

							<div className="p-2">
								<div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gray-400 shadow-md shadow-[#00000077]">
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
			</section>
		</>
	);
}
