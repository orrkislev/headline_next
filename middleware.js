import { countryToAlpha2 } from 'country-to-iso';
import { NextResponse } from 'next/server';

const countries = ["China", "Finland", "France", "Germany", "India", "Iran", "Israel", "Italy", "Japan", "Lebanon", "Netherlands", "Palestine", "Poland", "Russia", "Spain", "Turkey", "UK", "US", "Ukraine", "United Arab Emirates"]

async function getCountry(code) {
  if (code == 'uae') return 'United Arab Emirates';

  if (countries.includes(code)) return code;
  let foundCountry = countries.find(c => c.toLowerCase().replace(' ', '') === code.toLowerCase().replace(' ', ''));
  if (foundCountry) return foundCountry;
  foundCountry = countries.find(c => countryToAlpha2(c) === countryToAlpha2(code));
  if (foundCountry) return foundCountry;
  return false;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Exclude _next, api routes & files with extension
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);

  // Path with locale: /locale/country
  if (segments.length >= 2 && (segments[0] === 'en' || segments[0] === 'heb')) {
    const locale = segments[0];
    const countryCandidate = segments[1];
    const valid = await getCountry(countryCandidate);
    if (valid) {
      if (valid !== countryCandidate) {
        return NextResponse.redirect(new URL(`/${locale}/${valid}`, request.url));
      } else {
        return NextResponse.next();
      }
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Path without locale: /country (or other segments)
  if (segments.length >= 1) {
    const countryCandidate = segments[0];
    const valid = await getCountry(countryCandidate);
    if (valid) {
      const acceptLanguage = request.headers.get('accept-language') || '';
      const locale = acceptLanguage.trim().toLowerCase().startsWith('he') ? 'heb' : 'en';
      return NextResponse.redirect(new URL(`/${locale}/${valid}`, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next).*)']
};
