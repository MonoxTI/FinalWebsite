import type { Metadata } from "next"
import { Barlow, Barlow_Condensed } from "next/font/google"
import "./globals.css"
import ClientBody from "./ClientBody"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
})

// ── metadata lives here in the Server Component ──────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.assembledtutors.co.za/"),
  title: {
    default: "Assembled Tutoring | Grade 4–12 Maths Tutor Pretoria",
    template: "%s | Assembled Tutoring",
  },
  description:
    "Expert Grade 4 to 12 Mathematics tutoring in Pretoria, Gauteng. Monthly subscriptions and once-off sessions available. Psychological transformation approach.",
  keywords: [
    "maths tutor Pretoria",
    "Grade 12 mathematics tutor",
    "tutoring Pretoria",
    "maths tutoring Gauteng",
    "Grade 12 maths help",
    "assembled tutoring",
    "matric maths tutor",
    "private tutor Pretoria",
  ],
  authors: [{ name: "Assembled Tutoring" }],
  creator: "Assembled Tutoring",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.assembledtutors.co.za/",
    siteName: "Assembled Tutoring",
    title: "Assembled Tutoring | Grade 4–12 Maths Tutor Pretoria",
    description:
      "Expert Grade 4 to 12 Mathematics tutoring in Pretoria. Monthly subscriptions available. Book your first session today.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Assembled Tutoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assembled Tutoring | Grade 4–12 Maths Tutor Pretoria",
    description: "Expert maths tutoring in Pretoria. Book a session today.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  )
}