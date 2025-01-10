import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/config/dbConfig";
import User from "@/models/User";

export const maxDuration = 30;

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ session }) {
			await dbConnect();
			const email = session.user?.email;
			const sessionUser = await User.findOne({
				email: email,
			});

			if (session.user) {
				session.user._id = sessionUser._id;
			}

			return session;
		},
		async signIn({ profile }) {
			try {
				await dbConnect();

				// check if user is already exists
				const userExists = await User.findOne({
					email: profile?.email,
				});

				// if user not exist, create new user
				if (!userExists) {
					await User.create({
						email: profile?.email,
						username: profile?.name,
					});
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
