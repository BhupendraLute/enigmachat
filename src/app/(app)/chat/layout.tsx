'use client'
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<div className="w-full h-screen flex relative">
				<Sidebar />

				<main className="flex-grow bg-gray-800 text-white">
					<Navbar />
					<Fragment>{children}</Fragment>
				</main>
			</div>
		</Provider>
	);
}
