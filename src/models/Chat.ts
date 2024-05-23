import { Schema, model, models } from "mongoose";

export const ChatSchema = new Schema({
	prompt: {
		type: String,
		required: [true, "prompt is required"],
	},
	response: {
		type: String,
		required: [true, "response is required"],
	},
    createdby: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
