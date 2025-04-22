import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'myapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function middleware(req) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;
  const { pathname } = req.nextUrl;

  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? '/blog' : ''; // Assume /blog base path in prod

  const loginPath = `${basePath}/login`;
  const adminPath = isProduction ? `${basePath}/admin` : '/admin.html'; // Target path based on env

  // If user is not logged in and tries to access a protected admin path
  const isTryingToAccessAdmin = pathname === adminPath || (isProduction && pathname.startsWith(`${basePath}/admin`)) || (!isProduction && pathname === '/admin.html');

  if (!user?.isLoggedIn && isTryingToAccessAdmin) {
    const loginUrl = new URL(loginPath, req.url);
    loginUrl.searchParams.set('redirect', pathname); // Redirect back to the originally requested path
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to access /login (considering base path)
  if (user?.isLoggedIn && pathname === loginPath) {
     const adminRedirectUrl = new URL(adminPath, req.url);
     return NextResponse.redirect(adminRedirectUrl);
  }

  return res;
}

// Define the paths the middleware should run on
// Match /login, /blog/login, /admin.html, /blog/admin/*
export const config = {
  matcher: ['/login', '/blog/login', '/admin.html', '/blog/admin/:path*'],
};
