import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Exclude _next and api routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  // If pathname does not start with locale prefixes
  if (!pathname.startsWith('/en/') && !pathname.startsWith('/heb/')) {
    // Determine locale from request header "Accept-Language"
    const acceptLanguage = request.headers.get('accept-language') || '';
    const locale = acceptLanguage.trim().toLowerCase().startsWith('he') ? 'heb' : 'en';
    
    const newUrl = new URL(request.nextUrl);
    newUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
}

export const config = {
  // Updated matcher to exclude api and _next routes using negative lookahead
  matcher: ['/((?!api|_next).*)']
};
