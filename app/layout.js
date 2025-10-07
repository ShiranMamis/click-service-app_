import { Rubik } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Menu from "./components/global/Menu";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
export const dynamic = "force-dynamic"


const rubik = Rubik({ subsets: ["hebrew"] });
export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body className={rubik.className}>
        <ToastContainer autoClose={1500} position="top-center" />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="flex flex-col h-screen max-w-[660px] overflow-hidden relative">
          <main className="flex-1 bg-[rgb(250,250,250)]">{children}</main>
          {/* <p className="w-full bg-[rgb(250,250,250)] text-center text-[rgba(0,0,0,0.2)] p-1">
            פותח ע"י מסגרת אמת
          </p> */}
          <Menu />
        </div>
      </body>
    </html>
  );
}
