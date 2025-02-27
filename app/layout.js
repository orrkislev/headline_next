// import localFont from "next/font/local";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Lalezar, Amiri, Oswald, Roboto, Rubik, RocknRoll_One, Sawarabi_Gothic, Potta_One, Kiwi_Maru, Dela_Gothic_One, Noto_Sans_JP, Noto_Sans_SC, ZCOOL_QingKe_HuangYou, ZCOOL_KuaiLe, Noto_Sans_Devanagari, Palanquin_Dark } from "next/font/google";
import { WebVitals } from "@/components/web-vitals";
import "./globals.css";

// const hadassah = localFont({
//   src: "../utils/fonts/HadassahFriedlaender-Regular.otf",
//   variable: "--font-hadassah",
//   display: "swap",
// });
// const aduma = localFont({
//   src: "../utils/fonts/AdumaFOT-Regular.otf",
//   variable: "--font-aduma",
//   display: "swap",
// });
// const caslon = localFont({
//   src: "../utils/fonts/caslon.otf",
//   variable: "--font-caslon",
//   display: "swap",
// });
// const clarendon = localFont({
//   src: "../utils/fonts/clarendon-bold.otf",
//   variable: "--font-clarendon",
//   display: "swap",
// });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Google fonts from typography options
// const lalezar = Lalezar({
//   variable: "--font-lalezar",
//   weight: "400",
//   subsets: ["latin"],
// });
// const amiri = Amiri({
//   variable: "--font-amiri",
//   weight: "400",
//   subsets: ["latin"],
// });
// const oswald = Oswald({
//   variable: "--font-oswald",
//   weight: "400",
//   subsets: ["latin"],
// });
// const roboto = Roboto({
//   variable: "--font-roboto",
//   weight: "400",
//   subsets: ["latin"],
// });
// const rubik = Rubik({
//   variable: "--font-rubik",
//   weight: "400",
//   subsets: ["latin"],
// });
// const rocknrollOne = RocknRoll_One({
//   variable: "--font-rocknroll-one",
//   weight: "400",
//   subsets: ["latin"],
// });
// const sawarabiGothic = Sawarabi_Gothic({
//   variable: "--font-sawarabi-gothic",
//   weight: "400",
//   subsets: ["latin"],
// });
// const pottaOne = Potta_One({
//   variable: "--font-potta-one",
//   weight: "400",
//   subsets: ["latin"],
// });
// const kiwiMaru = Kiwi_Maru({
//   variable: "--font-kiwi-maru",
//   weight: "400",
//   subsets: ["latin"],
// });
// const delaGothicOne = Dela_Gothic_One({
//   variable: "--font-dela-gothic-one",
//   weight: "400",
//   subsets: ["latin"],
// });
// const notoSansJP = Noto_Sans_JP({
//   variable: "--font-noto-sans-jp",
//   weight: "400",
//   subsets: ["latin"],
// });
// const notoSansSC = Noto_Sans_SC({
//   variable: "--font-noto-sans-sc",
//   weight: "400",
//   subsets: ["latin"],
// });
// const zcoolQingKeHuangYou = ZCOOL_QingKe_HuangYou({
//   variable: "--font-zcool-qingke-huangyou",
//   weight: "400",
//   subsets: ["latin"],
// });
// const zcoolKuaiLe = ZCOOL_KuaiLe({
//   variable: "--font-zcool-kuai-le",
//   weight: "400",
//   subsets: ["latin"],
// });
// const notoSansDevanagari = Noto_Sans_Devanagari({
//   variable: "--font-noto-sans-devanagari",
//   weight: "400",
//   subsets: ["latin"],
// });
// const palanquinDark = Palanquin_Dark({
//   variable: "--font-palanquin-dark",
//   weight: "400",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "The Hear",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
