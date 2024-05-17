'use client'
import InputPrompt from '@/components/InputPrompt';
import { generativeAiModel } from '@/helper/generativeAiModel';
import React, { useEffect, useState } from 'react'

const ChatIdPage = () => {
  const [promptValue, setPromptValue] = useState("");

  useEffect(() => {
	const result = generativeAiModel("how can you help me?")
  }, [])
  

  return (
    <section className="mt-4 mx-3 md:mt-6 flex flex-col gap-4 items-center">
			<div className="p-4 w-full md:w-[65%] bg-gray-700 overflow-y-scroll h-[calc(100vh-12rem)] custom-scrollbar">
				
			</div>

			<div className="fixed bottom-6 w-full md:w-[60%] px-2">
				<InputPrompt
					onChange={(e) => {
						setPromptValue(e.target.value);
					}}
					onSubmit={(value) => {}}
				/>
			</div>
		</section>
  )
}

export default ChatIdPage