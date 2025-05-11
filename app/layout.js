// import { WebVitals } from "@/components/web-vitals";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"


export const metadata = {
  title: "The Hear",
  description: "A newsstand with a brain",
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
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <GoogleAnalytics />
        <SpeedInsights />
        {/* <WebVitals /> */}
        {children}
      </body>
    </html>
  );
}
