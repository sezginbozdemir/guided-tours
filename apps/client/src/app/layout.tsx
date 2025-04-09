import type { Metadata } from "next";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { theme } from "../../theme";
import { Poppins, Inria_Sans } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/modules/common/components/nav";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inriaSans = Inria_Sans({
  variable: "--font-inria-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Istanbul Tours",
  description: "Turkey Tours",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={`${poppins.variable} ${inriaSans.variable}`}>
        <MantineProvider theme={theme}>
          <Nav />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
