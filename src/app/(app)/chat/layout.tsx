"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ChatSidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<SessionProvider>
				<SidebarProvider >
					<ChatSidebar />
					<main className="flex flex-col w-full h-screen">
						<SidebarTrigger className="text-white w-8 m-2" />
						{children}
					</main>
				</SidebarProvider>
			</SessionProvider>
		</Provider>
	);
}
