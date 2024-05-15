import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Fragment } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full h-screen flex relative">
			<Sidebar />
			<main className="flex-grow bg-gray-800 text-white">
				<Navbar />
				<Fragment>{children}</Fragment>
			</main>
		</div>
	);
}
