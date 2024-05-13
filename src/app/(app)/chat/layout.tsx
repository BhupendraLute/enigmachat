import Sidebar from "@/components/Sidebar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full h-screen grid grid-cols-12 bg-gray-200">
			<Sidebar />
			<main>{children}</main>
		</div>
	);
}
