import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSesssion } from './utils';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (request.nextUrl.pathname.startsWith('/_next/')) {
		return NextResponse.next();
	}

	const token = request.cookies.get('token')?.value;
	const allowedRoutes = ['/login', '/register'];
	const isRouteAllowed = allowedRoutes.some(prefix =>
		pathname.startsWith(prefix)
	);

	if (!token) {
		if (isRouteAllowed) {
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL('/login', request.url));
	}

	const session = await getSesssion(token);
	if (session && isRouteAllowed) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (!session && !isRouteAllowed) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}
