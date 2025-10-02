import localFont from "next/font/local";

export const lato = localFont({
  src: [
    {
      path: "../public/fonts/Lato/Lato-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato/Lato-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-family",
});
