import { countryToAlpha2 } from 'country-to-iso';
import { NextResponse } from 'next/server';
import { countries } from './utils/sources/countries';

// Mapping from ISO country codes to your available countries
const countryCodeToSlug = {
  'IL': 'israel',
  'CN': 'china', 
  'FI': 'finland',
  'FR': 'france',
  'DE': 'germany',
  'IN': 'india',
  'IR': 'iran',
  'IT': 'italy',
  'JP': 'japan',
  'LB': 'lebanon',
  'NL': 'netherlands',
  'PS': 'palestine',
  'PL': 'poland',
  'RU': 'russia',
  'ES': 'spain',
  'TR': 'turkey',
  'GB': 'uk',
  'US': 'us',
  'UA': 'ukraine',
  'AE': 'uae'
};

function getUserCountry(request) {
  // Try various headers that might contain country information
  const headers = request.headers;
  
  // In development, check if this is localhost
  const isLocalhost = request.nextUrl.hostname === 'localhost' || request.nextUrl.hostname === '127.0.0.1';
  
  // Vercel provides country in this header
  let countryCode = headers.get('x-vercel-ip-country');
  
  // Cloudflare provides country in this header
  if (!countryCode) {
    countryCode = headers.get('cf-ipcountry');
  }
  
  // Development mode: simulate Israel for testing
  if (!countryCode && isLocalhost) {
    // You can change this to test different countries in development
    countryCode = 'IL'; // Simulate Israel for local development
  }
  
  // Fallback: default to US if we can't detect
  if (!countryCode) {
    countryCode = 'US';
  }
  
  // Map to your available countries
  const availableCountry = countryCodeToSlug[countryCode];
  
  // If the user's country isn't in your list, default to 'us'
  return availableCountry || 'us';
}

async function getCountry(code) {
  if (code == 'global') return 'global';
  if (code == 'uae') return 'United Arab Emirates';

  const countryNames = Object.keys(countries);
  if (countryNames.includes(code)) return code;
  let foundCountry = countryNames.find(c => c.toLowerCase().replace(' ', '') === code.toLowerCase().replace(' ', ''));
  if (foundCountry) return foundCountry;
  foundCountry = countryNames.find(c => countryToAlpha2(c) === countryToAlpha2(code));
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

  // Handle root path - redirect based on user location
  if (segments.length === 0) {
    const userCountry = getUserCountry(request);
    // Special case: Israel should redirect to Hebrew version
    const locale = userCountry === 'israel' ? 'heb' : 'en';
    return NextResponse.redirect(new URL(`/${locale}/${userCountry}`, request.url));
  }

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
