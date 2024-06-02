"use client";
import { Fragment } from "react";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<Fragment>{children}</Fragment>
		</SessionProvider>
	);
}
