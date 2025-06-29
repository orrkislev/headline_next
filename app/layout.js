// import { WebVitals } from "@/components/web-vitals";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import PWAMeta from "@/components/PWAMeta";


export const metadata = {
  title: "The Hear",
  description: "A newsstand with a brain",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "The Hear"
  },
  openGraph: {
    title: "The Hear",
    description: "A newsstand with a brain",
    url: "https://the-hear.com/",
    siteName: "The Hear",
    images: [
      {
        url: "https://the-hear.com/logo192.png",
        width: 192,
        height: 192,
        alt: "The Hear logo",
      },
      {
        url: "https://the-hear.com/logo512.png",
        width: 512,
        height: 512,
        alt: "The Hear logo large",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hear",
    description: "A newsstand with a brain",
    images: ["https://the-hear.com/logo512.png"],
    site: "@thehearnews"
  },
  icons: {
    icon: [
      { url: "/logo192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/logo192.png", sizes: "192x192", type: "image/png" }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <PWAMeta />
      </head>
      <body>
        <Analytics />
        <GoogleAnalytics />
        <SpeedInsights />
        <ServiceWorkerRegistration />
        {/* <WebVitals /> */}
        {children}
      </body>
    </html>
  );
}
