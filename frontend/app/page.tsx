"use client";

import { useState } from "react";
import VideoCard, { Video } from "./templates/videoCard";

export default function Home() {
  // 1. 練習用のダミー動画データ（各セクションで使い回す、または個別に増やすことも可能です）
  const [videoList] = useState<Video[]>(
    Array.from({ length: 10 }).map((_, i) => ({
      id: `v${i}`,
      title: `【テクテク動画】注目の動画 #${i + 1} - 楽しく学べるプログラミング講座`,
      thumbnailUrl: "./temp/1.jpg",
      views: Math.floor(Math.random() * 10000),
      createdAt: `${i + 1}日前`,
      postUser: "テクテク動画運営"
    }))
  );

  // 2. 人気のタグデータ
  const popularTags = ["プログラミング", "ゲーム実況", "高専あるある", "ガジェット", "作ってみた", "WEB開発", "AI", "CGアニメーション"];

  return (
    // セクション同士の間に程よい余白（space-y-10）を持たせ、最下部にフッターとの隙間（pb-16）を作ります
    <main className="bg-base-300 space-y-10 pb-16">
      
      {/* ─── セクション1：おすすめの動画 ─── */}
      <section className="md:w-[90%] w-[95%] mx-auto pt-5">
        <h1 className="md:text-3xl text-2xl font-extrabold text-primary-300">
          <i className="bi bi-emoji-sunglasses-fill mr-2"></i>
          おすすめの動画
        </h1>
        <span className="divider my-2"></span>
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-[5%] md:px-0 py-2.5 scrollbar-hide snap-x">
          {videoList.map((video) => (
            <div key={video.id} className="flex-none w-65 md:w-auto snap-start snap-x snap-mandatory">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── セクション2：人気の動画 ─── */}
      <section className="md:w-[90%] w-[95%] mx-auto">
        <h1 className="md:text-3xl text-2xl font-extrabold text-secondary">
          <i className="bi bi-fire text-red-500 mr-2"></i>
          人気の動画
        </h1>
        <span className="divider my-2"></span>
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-[5%] md:px-0 py-2.5 scrollbar-hide snap-x">
          {videoList.map((video) => (
            <div key={video.id} className="flex-none w-65 md:w-auto snap-start snap-x snap-mandatory">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── セクション3：新着動画 ─── */}
      <section className="md:w-[90%] w-[95%] mx-auto">
        <h1 className="md:text-3xl text-2xl font-extrabold text-info">
          <i className="bi bi-clock mr-2"></i>
          新着動画
        </h1>
        <span className="divider my-2"></span>
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-[5%] md:px-0 py-2.5 scrollbar-hide snap-x">
          {videoList.map((video) => (
            <div key={video.id} className="flex-none w-65 md:w-auto snap-start snap-x snap-mandatory">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── セクション4：運営の気まぐれ ─── */}
      <section className="md:w-[90%] w-[95%] mx-auto">
        <h1 className="md:text-3xl text-xl font-extrabold text-accent flex flex-wrap items-center gap-1 md:gap-2">
          <i className="bi bi-megaphone-fill text-yellow-400 mr-2"></i>
          <span>運営の気まぐれ</span>
          <span className="badge badge-accent badge-sm md:badge-md font-bold">
            おすすめ
          </span>
        </h1>
        <span className="divider my-2"></span>
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-[5%] md:px-0 py-2.5 scrollbar-hide snap-x">
          {videoList.map((video) => (
            <div key={video.id} className="flex-none w-65 md:w-auto snap-start snap-x snap-mandatory">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── セクション5：【動画以外】アップデート情報 ＆ 今週のアンケート（2カラム形式） ─── */}
      <section className="md:w-[90%] w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 左側2カラム：アップデート情報 */}
        <div className="lg:col-span-2 bg-neutral/20 p-5 rounded-2xl border border-neutral/40">
          <h2 className="text-xl font-extrabold flex items-center gap-2 mb-4 text-info">
            <i className="bi bi-journal-text"></i>
            アップデート・お知らせ
          </h2>
          <div className="space-y-3">
            {[
              { date: "2026/05/16", type: "badge-primary", typeText: "お知らせ", title: "テクテク動画(RC)を公開しました。" },

            ].map((news, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 rounded-xl hover:bg-neutral/40 transition-colors cursor-pointer text-xs">
                <span className="opacity-60 font-mono">{news.date}</span>
                <span className={`badge ${news.type} badge-sm font-bold sm:mx-2`}>{news.typeText}</span>
                <p className="text-base-content font-medium line-clamp-1 flex-1">{news.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 右側1カラム：今週のアンケート */}
        <div className="bg-neutral/20 p-5 rounded-2xl border border-neutral/40 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-extrabold flex items-center gap-2 mb-2 text-warning">
              <i className="bi bi-bar-chart-line-fill"></i>
              運営アンケート
            </h2>
            <p className="text-xs font-bold text-base-content mb-4">Q. 次の開発で、一番欲しい機能はどれ？</p>
            <div className="space-y-3">
              {[
                { label: "コメントの生流し（ニコニコ風）", value: 65, color: "progress-primary" },
                { label: "マイリスト・お気に入り機能", value: 20, color: "progress-secondary" },
                { label: "いいね！時のアニメーション増量", value: 15, color: "progress-accent" },
              ].map((vote, idx) => (
                <div key={idx} className="cursor-pointer group">
                  <div className="flex justify-between text-[11px] font-medium mb-1 group-hover:text-primary transition-colors">
                    <span>{vote.label}</span>
                    <span className="font-mono font-bold">{vote.value}%</span>
                  </div>
                  <progress className={`progress ${vote.color} w-full h-2`} value={vote.value} max="100"></progress>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] opacity-50 text-center mt-4">総投票数: 1,248票 · 毎週日曜日更新(かもしれない)</p>
        </div>
      </section>

      <section className="md:w-[90%] w-[95%] mx-auto py-6 bg-neutral/30 rounded-2xl px-4 md:px-8">
        <h2 className="text-sm font-bold opacity-80 flex items-center gap-2 mb-3 text-base-content">
          <i className="bi bi-tags-fill text-info"></i>
          いま人気のタグから探す
        </h2>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag, idx) => (
            <a href={`/search?tag=${tag}`} key={idx} className="badge badge-md bg-base-100 hover:bg-primary hover:text-primary-content transition-all py-3 px-4 border-none cursor-pointer font-medium text-xs">
              # {tag}
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
