import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import getGeminiResponse from "@/config/gemini-config";
import { NextApiResponse } from "next";

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

export async function GET(request: NextRequest, response: NextApiResponse) {

	console.log(request)
	const userId = "54654646"

	try {
		const user = await User.findById({ _id: userId });

		if (!user) {
			return NextResponse.json({
				status: 404,
				error: "user not found",
			});
		}

		const chats = user.chats;

		if (!chats) {
			return NextResponse.json({
				status: 404,
				error: "Failed to get chats",
			});
		}

		if (chats.length <= 0) {
			return NextResponse.json({
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

		return NextResponse.json({
			status: 500,
			error: "Somenting went worng. try again",
		});
	}
}
