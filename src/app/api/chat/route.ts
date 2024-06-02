import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import getGeminiResponse from "@/config/gemini-config";
import { NextApiResponse } from "next";

export async function POST(request: NextRequest, response : NextApiResponse) {
	const { title, prompt, userId } = await request.json();

	if (!title || !prompt || !userId) {
		return response.status(400).json({
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
			createdBy: userId,
		});

		return NextResponse.json({
			status: 200,
			message: "Successfully created new chat",
			data: newChat,
		});
	} catch (error) {
		return response.status(500).json({
			status: 500,
			error: "Failed to create new chat",
		});
	}
}

export async function GET(request: NextRequest, response: NextApiResponse) {
	const session = await getSession();
	const userEmail = session?.user?.email;

	try {
		const user = await User.findOne({ email: userEmail });

		if (!user) {
			return response.status(404).json({
				status: 404,
				error: "session user not found",
			});
		}

		const chats = user.chats;

		if (!chats) {
			return response.status(404).json({
				status: 404,
				error: "Failed to get chats",
			});
		}

		if (chats.length <= 0) {
			return response.status(404).json({
				status: 404,
				error: "Chats are not available or empty",
			});
		}

		return NextResponse.json({
			status: 200,
			message: "successfully fetched all the chats",
			data: { chats },
		});
	} catch (error) {
		console.log(error);
		
		return response.status(500).json({
			status: 500,
			error: "Somenting went worng. try again",
		});
	}
}
