"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<SessionProvider>
				<div className="w-full h-screen flex relative">
					<Sidebar />

					<main className="flex-grow bg-gray-800 text-white">
						<Navbar />
						<Fragment>{children}</Fragment>
					</main>
				</div>
			</SessionProvider>
		</Provider>
	);
}
