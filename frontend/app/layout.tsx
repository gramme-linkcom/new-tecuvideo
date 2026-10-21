import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp", 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | テクテク動画(RC)",
    default: "テクテク動画(RC)",
  },
  description: "Arcto ID公式の動画共有サービス『テクテク動画』です。",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col bg-base-300 m-0 p-0 ${notoSansJP.className} ${notoSansJP.variable}`}>
        <header className="bg-base-100">
          {/* daisyUIのDrawer（ドロワー）機能のラッパー */}
          <div className="drawer drawer-end">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            
            {/* 【メインコンテンツ部分】 */}
            <div className="drawer-content flex flex-col">
              <div className="py-3 md:w-[90%] w-[98%] mx-auto navbar">
                
                {/* ロゴ側 */}
                <div className="flex-none mr-10">
                  <a href="/" className="flex w-fit">
                    <img src="/title.webp" alt="テクテク動画" className="w-48"/>
                  </a>
                </div>

                {/* 検索欄側 */}
                <div className="flex-1 gap-2">
                  <div className="hidden md:block w-full max-w-md ml-auto">
                    <div className="join w-full max-w-md">
                      <input type="text" placeholder="キーワード・タグを入力" className="input input-bordered join-item w-full focus:outline-none" />
                      <button className="btn btn-primary join-item">
                        <i className="bi bi-search mr-1"></i>
                        <span className="sr-only">検索</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/*ハンバーガーボタン（検索欄の右側)*/}
                <div className="flex-none ml-2">
                  <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                    <i className="bi bi-list text-2xl"></i>
                  </label>
                </div>

              </div>
            </div> 

            {/* 【サイドバー部分（右から飛び出すメニュー）】 */}
            <div className="drawer-side z-50">
              {/* 背景の黒いオーバーレイ */}
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              
              {/* メニューの中身 */}
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-base">
                <li className="menu-title font-bold text-lg mb-4 pb-2">メニュー</li>
                <li className="border-y border-info-100">
                  <a href="/upload" className="py-2 my-3">
                    <i className="bi bi-plus-circle mr-2 "></i>
                    動画投稿
                  </a>
                </li>
                <li className="border-b border-info-100">
                  <a href="/" className="py-2 my-3">
                    <i className="bi bi-info-circle mr-2"></i>
                    インフォメーション
                  </a>
                </li>
                
                {/* スマホ用検索欄 */}
                <li className="mt-6 md:hidden">
                  <div className="join w-full p-0">
                    <input type="text" placeholder="キーワード・タグを入力" className="input input-bordered join-item w-full input-sm focus:outline-none" />
                    <button className="btn btn-primary btn-sm join-item">
                      <i className="bi bi-search"></i>
                      <span className="sr-only">検索</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </header>
        {children}
        <footer className="bg-base-100 text-base-content border-t border-base-200 mt-auto">
          <div className="md:w-[90%] w-[95%] mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex-none mr-10">
                <a href="/" className="flex w-fit">
                  <img src="/title.webp" alt="テクテク動画" className="w-48"/>
                </a>
              </div>
            </div>

            {/* リンク集1：サービス */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-300 mb-3">サービス</h2>
              <ul className="space-y-2 text-xs opacity-80">
                <li><a href="/" className="hover:text-primary hover:underline transition-all">トップページ</a></li>
                <li><a href="/post" className="hover:text-primary hover:underline transition-all">動画を投稿する</a></li>
                <li><a href="#" className="hover:text-primary hover:underline transition-all">ランキング</a></li>
              </ul>
            </div>

            {/* リンク集2：サポート */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-300 mb-3">サポート</h2>
              <ul className="space-y-2 text-xs opacity-80">
                <li><a href="#" className="hover:text-primary hover:underline transition-all">インフォメーション</a></li>
                <li><a href="#" className="hover:text-primary hover:underline transition-all">利用規約</a></li>
                <li><a href="#" className="hover:text-primary hover:underline transition-all">お問い合わせ</a></li>
              </ul>
            </div>
          </div>

          {/* 最下部：著作権表記 */}
          <div className="bg-base-200 py-4 text-center text-xs opacity-60 border-t border-base-300">
            <p>&copy; {new Date().getFullYear()} Arcto ID / テクテク動画(RC). All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
