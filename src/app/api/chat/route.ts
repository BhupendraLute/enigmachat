import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function POST(request: NextRequest) {
	const { title, prompt, response, userId } = await request.json();

	if (!title || !prompt || !response || !userId) {
		return NextResponse.json({
			status: 400,
			error: "Failed to create new chat. Someting is missing",
		});
	}

	try {
		const user = await User.findById(userId);

		if (!user) {
			return NextResponse.json({
				status: 404,
				message: `User with userid ${userId} is not found`,
			});
		}

		const newChat = await Chat.create({
			title,
			chat: {
				prompt,
				response,
			},
			createdBy: user._id,
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

export async function GET(request: NextRequest) {
	const session = await getSession();
	const userEmail = session?.user?.email;

	try {
		const user = await User.findOne({ email: userEmail });

		if (!user) {
			return NextResponse.json({
				status: 404,
				error: "session user not found",
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
	} catch (error) {}
}
