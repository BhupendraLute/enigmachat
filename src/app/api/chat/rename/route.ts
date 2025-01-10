import Chat from "@/models/Chat";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// rename chat
export async function PATCH(request: NextRequest, response: NextApiResponse) {
    const { chatId, title } = await request.json();

    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { title },
            { new: true, lean: true }
        );

        if (!chat) {
            return NextResponse.json({
                status: 404,
                error: "Chat not found",
            });
        }

        return NextResponse.json({
            status: 200,
            data: chat,
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: "Internal Server Error",
        });
    }
}