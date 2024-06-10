import Image from "next/image";
import React from "react";

const ChatLoader = ({ userImage }: { userImage: string }) => {
	return (
		<div className="w-full mb-2">
			<div className="w-full p-2 mr-8 flex justify-end gap-2">
				<div className="w-[50%] p-2 text-sm border border-gray-400 rounded-md">
					<div className="loader items-start">
						<hr />
						<hr />
					</div>
				</div>
				<div className="w-8 rounded-full overflow-hidden flex items-center justify-center">
					<Image
						src={"/logo.jpeg"}
						alt="user-image"
						width={20}
						height={20}
						className="w-full rounded-full"
					/>
				</div>
			</div>

			<div className="w-fullp-2 mr-8 flex justify-start gap-2">
				<div className="w-8 rounded-full overflow-hidden flex items-center justify-center">
					<Image
						src={userImage!}
						alt="user-image"
						width={20}
						height={20}
						className="w-full rounded-full"
					/>
				</div>
				<div className="w-[50%] p-2 text-sm border border-gray-400 rounded-md">
					<div className="loader items-start">
						<hr />
						<hr />
						<hr />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatLoader;
