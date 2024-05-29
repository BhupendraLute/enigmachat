import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/config/dbConfig";
import User from "@/models/User";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
                email: session.user?.email
            })
    
            // session.user.id = sessionUser._id.toString()

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
						image: profile?.image,
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
