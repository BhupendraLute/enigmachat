import Chat from "@/models/Chat";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


// delete chat
export async function POST(request: NextRequest, response: NextApiResponse) {
    const { chatId } = await request.json();
  
    try {
      const chat = await Chat.findByIdAndDelete(chatId).exec()
  
      if (!chat) {
        return NextResponse.json({
          status: 404,
          error: "Failed to delete chat",
        });
      }
  
      return NextResponse.json({
        status: 200,
        message: "Chat deleted successfully"
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json({
        status: 500,
        error: "An error occurred while deleteing the chat",
      });
    }
  }