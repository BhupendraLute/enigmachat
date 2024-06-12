import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


// get all chats for current user
export async function POST(request: NextRequest, response: NextApiResponse) {
	const { userId } = await request.json();

	try {
		const user = await User.findById({ _id: userId });

		if (!user) {
			return NextResponse.json({
				status: 404,
				error: "user not found",
			});
		}

		const chats = await Chat.find({ createdby: userId });

		if (!chats) {
			return NextResponse.json({
				status: 404,
				message: "chats not found",
			});
		}

		return NextResponse.json({
			status: 404,
			message: "Chats fetched successfully",
			data: chats
		});

		
	} catch (error) {
		console.log(error);

		return NextResponse.json({
			status: 500,
			error: "Somenting went worng. try again",
		});
	}
}
