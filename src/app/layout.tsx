import "./globals.css";
import Navbar from "../components/Header";
// import Footer from "../components/Footer";

export const metadata = {
  title: "TeamTuned",
  description:
    "",
  alternates: {
    canonical: 'https://teamtuned.com/',
  },
  keywords: [
    "TeamTuned"
  ],
  openGraph: {
    title: "TeamTuned",
    description:
      "",
    url: "https://teamtuned.com",
    siteName: "TeamTuned",
    type: "website",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "TeamTuned",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeamTuned",
    description:
      "",
    images: ["/opengraph.png"],
  },
  icons: {
    icon: "/teamtuned_ai_logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ FAVICONS */}
        <link rel="icon" href="/teamtuned_ai_logo.svg?v=2" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/teamtuned_ai_logo.svg?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <meta name="theme-color" content="#ffffff" />

        {/* ✅ CANONICAL */}
        <link rel="canonical" href="https://teamtuned.com" />   

        {/* ✅ BASIC SEO */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />

        {/* ✅ OPEN GRAPH */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content="https://waardian.com/opengraph.png" />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content="Waardian" />

        {/* ✅ TWITTER */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content="https://waardian.com/opengraph.png" />

        <title>{metadata.title}</title>
      </head>
      <body>
        {/* <Navbar /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
