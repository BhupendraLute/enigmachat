import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const url = request.nextUrl;

	if (token && url.pathname === "/") {
		return NextResponse.redirect(new URL("/chat", request.url));
	}

	if (
		!token &&
		(url.pathname === "/chat" || url.pathname.startsWith("/chat/"))
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/chat", "/chat/:id"],
};
