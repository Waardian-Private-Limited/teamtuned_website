import "./globals.css";
import Navbar from "../components/Header";
// import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL('https://teamtuned.com'),
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
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ FAVICONS */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
