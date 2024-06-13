import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import getGeminiResponse from "@/config/gemini-config";
import { NextApiResponse } from "next";

export const maxDuration = 30;

// Create chat
export async function POST(request: NextRequest, response: NextApiResponse) {
	const { title, prompt, userId } = await request.json();

	if (!title || !prompt || !userId) {
		return NextResponse.json({
			status: 400,
			error: "Failed to create new chat. Someting is missing",
		});
	}

	try {
		const chatResponse = await getGeminiResponse(prompt.trim());

		const newChat = await Chat.create({
			title,
			chat: {
				prompt,
				response: chatResponse,
			},
			createdby: userId,
		});

		return NextResponse.json({
			status: 200,
			message: "Successfully created new chat",
			data: newChat,
		});
	} catch (error) {
		return NextResponse.json({
			status: 500,
			error: "Failed to create new chat",
		});
	}
}