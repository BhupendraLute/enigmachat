import Chat from "@/models/Chat";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

// rename chat
export async function PATCH(request: NextRequest, response: NextApiResponse) {
    const { chatId, title } = await request.json();
  
    try {
      const chat = await Chat.findById(chatId);
  
      if (!chat) {
        return NextResponse.json({
          status: 404,
          error: "Chat not found",
        });
      }
  
      chat.title = title;
  
      await chat.save();
  
      return NextResponse.json({
        status: 200,
        message: "Chat renamed successfully",
        data: chat,
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json({
        status: 500,
        error: "An error occurred while renaming the chat",
      });
    }
  }