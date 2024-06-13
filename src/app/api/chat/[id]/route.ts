import getGeminiResponse from "@/config/gemini-config";
import Chat from "@/models/Chat";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

// update existing chat chat
export async function PATCH(request: NextRequest, response: NextApiResponse) {
	const { prompt, chatId } = await request.json();

	if (!prompt || !chatId) {
		return NextResponse.json({
			status: 400,
			error: "Failed to create new chat. Someting is missing",
		});
	}

	try {
		const chatResponse = await getGeminiResponse(prompt.trim());
		const isvalidChat = await Chat.findById(chatId);

		if (!isvalidChat) {
			return NextResponse.json({
				status: 400,
				error: "Chat is not available",
			});
		}

		const newChat = {
			prompt,
			response: chatResponse,
		};

		const chat = await Chat.findById(chatId);

		if (!chat) {
			return NextResponse.json({
				status: 200,
				error: "Failed to update chat",
			});
		}		

		chat.chat.push(newChat);

		await chat.save();

		return NextResponse.json({
			status: 200,
			message: "Successfully updated chat",
			data: chat,
		});
	} catch (error) {
		return NextResponse.json({
			status: 500,
			error: "Failed to update chat",
		});
	}
}

// get chat by id
export async function GET(request: NextRequest, response: NextApiResponse) {
	const url = request.headers.get("referer");
	// console.log("url : ", request.headers.get('referer'))

	const chatId = url?.split("/").pop()?.trim();
	// console.log("chatId:", chatId)

	try {
		if (!chatId) {
			return NextResponse.json({
				status: 400,
				error: "Failed to get chat. please provide chat id",
			});
		}

		const chat = await Chat.findById(chatId);

		if (!chat) {
			return NextResponse.json({
				status: 404,
				error: "Chat not found",
			});
		}

		return NextResponse.json({
			status: 200,
			message: "chat found successfully",
			data: chat,
		});
	} catch (error) {
		return NextResponse.json({
			status: 500,
			error: "Failed to get chat",
		});
	}
}
