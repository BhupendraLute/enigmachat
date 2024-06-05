import Image from 'next/image'
import React from 'react'

const ChatLoader = ({userImage}: {userImage: string}) => {
  return (
    <div className="w-full md:w-[65%] mb-2 border-b border-gray-400">
						<div className="w-full p-2 mr-8 flex justify-end gap-2">
							<div className="w-full p-2 text-sm border border-gray-400 rounded-md">
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							</div>
							<div className="w-12 rounded-full overflow-hidden">
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
							<div className="w-12 rounded-full overflow-hidden">
								<Image
									src={userImage!}
									alt="user-image"
									width={20}
									height={20}
									className="w-full rounded-full"
								/>
							</div>
							<div className="w-full p-2 text-sm border border-gray-400 rounded-md">
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							</div>
						</div>
					</div>
  )
}

export default ChatLoader