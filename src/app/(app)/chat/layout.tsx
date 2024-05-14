import Sidebar from "@/components/Sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full h-screen flex relative">
			<Sidebar />
			<main className="flex-grow bg-gray-100 p-4">{children}</main>
		</div>
	);
}
