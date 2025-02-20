import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
// Import Google fonts from typography options
import { 
  Lalezar,
  Amiri,
  Oswald,
  Roboto,
  Rubik,
  RocknRoll_One,
  Sawarabi_Gothic,
  Potta_One,
  Kiwi_Maru,
  Dela_Gothic_One,
  Noto_Sans_JP,
  Noto_Sans_SC,
  ZCOOL_QingKe_HuangYou,
  ZCOOL_KuaiLe,
  Noto_Sans_Devanagari,
  Palanquin_Dark
} from "next/font/google";
import "./globals.css";

// Local fonts imported using next/font/local
const frankReTzar = localFont({
  src: "../utils/fonts/frank-re-tzar-regular-aaa.otf",
  variable: "--font-frank-re-tzar",
  display: "swap",
});
const frankRe = localFont({
  src: "../utils/fonts/frank-re-medium-aaa.otf",
  variable: "--font-frank-re",
  display: "swap",
});
const telAviv = localFont({
  src: "../utils/fonts/TelAviv-ModernistBold.ttf",
  variable: "--font-tel-aviv",
  display: "swap",
});
const hadassah = localFont({
  src: "../utils/fonts/HadassahFriedlaender-Regular.otf",
  variable: "--font-hadassah",
  display: "swap",
});
const mandatory = localFont({
  src: "../utils/fonts/Mandatory-18.otf",
  variable: "--font-mandatory",
  display: "swap",
});
const mandatory29 = localFont({
  src: "../utils/fonts/Mandatory-29.otf",
  variable: "--font-mandatory29",
  display: "swap",
});
const aduma = localFont({
  src: "../utils/fonts/AdumaFOT-Regular.otf",
  variable: "--font-aduma",
  display: "swap",
});
const helvetica = localFont({
  src: "../utils/fonts/helvetica-bold.otf",
  variable: "--font-helvetica",
  display: "swap",
});
const futura = localFont({
  src: "../utils/fonts/futura-heavy.ttf",
  variable: "--font-futura",
  display: "swap",
});
const futuraItalic = localFont({
  src: "../utils/fonts/futura-bold-italic.ttf",
  variable: "--font-futura-italic",
  display: "swap",
});
const caslon = localFont({
  src: "../utils/fonts/caslon.otf",
  variable: "--font-caslon",
  display: "swap",
});
const clarendon = localFont({
  src: "../utils/fonts/clarendon-bold.otf",
  variable: "--font-clarendon",
  display: "swap",
});
const cheltenham = localFont({
  src: "../utils/fonts/cheltenham-cond-normal-700.ttf",
  variable: "--font-cheltenham",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Google fonts from typography options
const lalezar = Lalezar({
  variable: "--font-lalezar",
  weight: "400",
  subsets: ["latin"],
});
const amiri = Amiri({
  variable: "--font-amiri",
  weight: "400",
  subsets: ["latin"],
});
const oswald = Oswald({
  variable: "--font-oswald",
  weight: "400",
  subsets: ["latin"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  weight: "400",
  subsets: ["latin"],
});
const rubik = Rubik({
  variable: "--font-rubik",
  weight: "400",
  subsets: ["latin"],
});
const rocknrollOne = RocknRoll_One({
  variable: "--font-rocknroll-one",
  weight: "400",
  subsets: ["latin"],
});
const sawarabiGothic = Sawarabi_Gothic({
  variable: "--font-sawarabi-gothic",
  weight: "400",
  subsets: ["latin"],
});
const pottaOne = Potta_One({
  variable: "--font-potta-one",
  weight: "400",
  subsets: ["latin"],
});
const kiwiMaru = Kiwi_Maru({
  variable: "--font-kiwi-maru",
  weight: "400",
  subsets: ["latin"],
});
const delaGothicOne = Dela_Gothic_One({
  variable: "--font-dela-gothic-one",
  weight: "400",
  subsets: ["latin"],
});
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: "400",
  subsets: ["latin"],
});
const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  weight: "400",
  subsets: ["latin"],
});
const zcoolQingKeHuangYou = ZCOOL_QingKe_HuangYou({
  variable: "--font-zcool-qingke-huangyou",
  weight: "400",
  subsets: ["latin"],
});
const zcoolKuaiLe = ZCOOL_KuaiLe({
  variable: "--font-zcool-kuai-le",
  weight: "400",
  subsets: ["latin"],
});
const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  weight: "400",
  subsets: ["latin"],
});
const palanquinDark = Palanquin_Dark({
  variable: "--font-palanquin-dark",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Hear",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}
         ${frankReTzar.variable} ${frankRe.variable} ${telAviv.variable}
         ${hadassah.variable} ${mandatory.variable} ${mandatory29.variable}
         ${aduma.variable} ${helvetica.variable} ${futura.variable}
         ${futuraItalic.variable} ${caslon.variable} ${clarendon.variable}
         ${cheltenham.variable}
         ${lalezar.variable} ${amiri.variable} ${oswald.variable} ${roboto.variable}
         ${rubik.variable} ${rocknrollOne.variable} ${sawarabiGothic.variable}
         ${pottaOne.variable} ${kiwiMaru.variable} ${delaGothicOne.variable}
         ${notoSansJP.variable} ${notoSansSC.variable} ${zcoolQingKeHuangYou.variable}
         ${zcoolKuaiLe.variable} ${notoSansDevanagari.variable} ${palanquinDark.variable}
         antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
