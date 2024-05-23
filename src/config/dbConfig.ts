import mongoose from "mongoose";

type ConnectionObject = {
	isConnectd?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
	if (connection.isConnectd) {
		console.log("Already connected to the database");
		return;
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI || "", {
			dbName: "enigmachat",
		});

		connection.isConnectd = db.connections[0].readyState;

		console.log("DB connected successfully");
	} catch (error) {
		console.log("Database connection failed : ", error);

		process.exit(1);
	}
}

export default dbConnect;
