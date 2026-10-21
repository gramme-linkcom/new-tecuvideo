"use client";

import { useState } from "react";

export default function VideoUploadPage() {
// 現在のステップを管理（1: ファイル選択, 2: 詳細入力, 3: 最終確認）
const [step, setStep] = useState<1 | 2 | 3>(1);

// フォームの入力データを一括管理する状態
const [videoFile, setVideoFile] = useState<File | null>(null);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
const [encodeType, setEncodeType] = useState("server-enc");

// 動画ファイルが選ばれたら、自動でステップ2へ進む
const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setVideoFile(file);
    // ファイル名をデフォルトのタイトルに設定してあげる優しさ
    setTitle(file.name.replace(/\.[^/.]+$/, ""));
    // ぬるっと次のステップへ！
    setStep(2);
    }
};

// サムネイルファイルが選ばれた時の処理
const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
    setThumbnailFile(e.target.files[0]);
    }
};

// 最終送信処理（将来GoのAPIを叩く場所）
const handleFinalSubmit = () => {
    alert(`【投稿完了デモ】\nバックエンド(Go)へ動画データ（${videoFile?.name}）を送信しました！`);
    // 送信完了したらステップ1に戻すか、トップにリダイレクトする設計にします
    setVideoFile(null);
    setTitle("");
    setDescription("");
    setThumbnailFile(null);
    setStep(1);
};

return (
<div className="md:w-[80%] w-[95%] mx-auto py-10 min-h-screen space-y-8">
    
    {/* ─── ページヘッダー ─── */}
    <div className="flex items-center gap-3">
        <i className="bi bi-cloud-arrow-up-fill text-primary text-3xl"></i>
        <h1 className="text-2xl md:text-3xl font-black tracking-wider text-base-content">
        動画の投稿
        </h1>
    </div>

    {/* ─── daisyUIの進化系ステップインジケーター ─── */}
    <div className="w-full flex justify-center py-2 bg-neutral/10 rounded-2xl border border-neutral/20">
        <ul className="steps steps-horizontal w-full max-w-xl text-xs md:text-sm font-bold">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>動画選択</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>詳細入力</li>
        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>最終確認</li>
        </ul>
    </div>

    {/* ─── 各ステップの画面切り替え（条件分岐） ─── */}
    <div className="transition-all duration-300">
        
        {/* 【ステップ1：動画ファイル選択】 */}
        {step === 1 && (
        <div className="max-w-2xl mx-auto bg-neutral/40 border-2 border-dashed border-neutral-content/20 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors relative group">
            <input 
            type="file" 
            accept="video/*" 
            onChange={handleVideoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="space-y-4 pointer-events-none">
            <i className="bi bi-upload text-5xl text-primary group-hover:scale-110 inline-block transition-transform duration-300"></i>
            <div>
                <p className="text-base font-bold text-base-content">
                投稿する動画ファイルをドラッグ＆ドロップ
                </p>
                <p className="text-xs opacity-50 mt-1">またはクリックしてファイルを選択</p>
            </div>
            <div className="text-[11px] opacity-40 bg-base-300/50 max-w-xs mx-auto py-1.5 rounded-lg">
                MP4, WebM (最大 500MB)
            </div>
            </div>
        </div>
        )}

        {/* 【ステップ2：動画情報入力（フォーム）】 */}
        {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            <div className="lg:col-span-2 bg-neutral/20 p-6 rounded-2xl border border-neutral/40 space-y-5">
            <h2 className="text-lg font-bold flex items-center gap-2 text-primary-300">
                <i className="bi bi-pencil-square"></i> 動画の情報を入力
            </h2>
            
            {/* タイトル */}
            <div className="form-control w-full">
                <label className="label py-1"><span className="label-text font-bold text-xs opacity-80">タイトル（必須）</span></label>
                <input 
                type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトル" 
                className="input input-bordered w-full focus:outline-none focus:border-primary text-sm" 
                />
            </div>

            {/* 概要欄 */}
            <div className="form-control w-full">
                <label className="label py-1"><span className="label-text font-bold text-xs opacity-80">説明・概要欄</span></label>
                <textarea 
                value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="動画についての説明" 
                className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-primary text-sm"
                ></textarea>
            </div>

            {/* サムネイル選択 */}
            <div className="form-contr fiol w-full flex">
                <label className="label py-1 flex-1"><span className="label-text font-bold text-xs opacity-80">カスタム サムネイル</span></label>
                <input type="file" accept="image/*" onChange={handleThumbnailChange} className="file-input file-input-borde red file-input-smle-input-primary w-full max-w-xs focus:outline-none text-xs flex-none" />
                {thumbnailFile && <p className="text-[11px] text-success mt-1 font-mono">選択中: {thumbnailFile.name}</p>}
            </div>
            
            {/* エンコード方法の選択 */}
            <div className="flex items-center">
                <h2 className="text-lg font-bold flex items-center gap-2 text-primary-300">
                    <i className="bi bi-sliders2"></i> エンコード方法の選択
                </h2>
                
                {/* 親要素（group）に「py-2」などのパディングを入れて、
                    アイコンの周りに見えないホバー判定のクッション（遊び）を作るとさらに安定します */}
                <div className="group relative inline-block cursor-pointer py-2">
                    <i className="bi bi-info-circle-fill text-sm ml-2"></i>
                    
                    <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-6 left-1/2 -translate-x-1/2 mb-1 w-64 p-3 bg-neutral text-[11px] text-base-content rounded-lg shadow-xl transition-all duration-300 z-30 leading-relaxed">
                        
                        {/* ─── サーバー側 ─── */}
                        <p className="font-bold text-accent mb-1">【サーバーでエンコード】</p>
                        <p className="opacity-90">動画をそのままアップロードする基本の方法です。</p>
                        <ul className="list-disc list-inside mt-1 opacity-80 pl-1 space-y-0.5">
                            <li><span className="text-success font-bold">安心：</span>スマホや低スペックPCでも大丈夫</li>
                            <li><span className="text-error font-bold">注意：</span>混雑時は処理待ちが発生します</li>
                        </ul>

                        {/* ─── クライアント側 ─── */}
                        <p className="font-bold text-accent mt-3 mb-1">【自分でエンコード】</p>
                        <p className="opacity-90">お使いのブラウザ上で変換してから送信します。</p>
                        <ul className="list-disc list-inside mt-1 opacity-80 pl-1 space-y-0.5">
                            <li><span className="text-success font-bold">爆速：</span>混雑ゼロ！投稿後すぐ公開されます</li>
                            <li><span className="text-error font-bold">注意：</span>端末のパワーが必要です（スマホ非推奨）</li>
                        </ul>
                        
                        {/* pointer-events-auto を入れて、ツールチップ内のテキストやリンクに触れるようにします */}
                        <p className="opacity-90 mt-3 border-t border-base-300/50 pt-2 pointer-events-auto">
                            詳しくは<a href="/help" className="text-primary hover:underline font-bold">こちら</a>のページをご覧ください。
                        </p>
                    </div>
                </div>
            </div>
            <fieldset className="fieldset">
            <label className="flex gap-2 cursor-pointer items-center">
                <input type="radio" name="encode-type" className="radio radio-sm theme-controller" value="server-enc" checked={encodeType === "server-enc"} onChange={(e) => setEncodeType(e.target.value)}/>
                サーバーでエンコード
            </label>
            <label className="flex gap-2 cursor-pointer items-center">
                <input type="radio" name="encode-type" className="radio radio-sm theme-controller" value="own-enc" checked={encodeType === "own-enc"} onChange={(e) => setEncodeType(e.target.value)}/>
                自分でエンコード
            </label>
            </fieldset>

            {/* ナビゲーションボタン */}
            <div className="pt-4 flex justify-between gap-4">
                <button onClick={() => setStep(1)} className="btn btn-ghost btn-sm sm:btn-md font-bold">
                <i className="bi bi-arrow-left"></i> やり直す
                </button>
                <button 
                onClick={() => setStep(3)} 
                disabled={!title.trim()} 
                className="btn btn-primary btn-sm sm:btn-md w-36 sm:w-48 font-bold"
                >
                確認画面へ <i className="bi bi-arrow-right"></i>
                </button>
            </div>
            </div>

            {/* 右側の選択中のファイル情報 */}
            <div className="bg-neutral/10 p-5 rounded-2xl border border-neutral/30 h-fit space-y-3">
            <h3 className="text-xs font-bold text-info uppercase tracking-wider">選択中の動画</h3>
            <div className="p-3 bg-base-300/50 rounded-xl font-mono text-xs space-y-1">
                <p className="text-base-content font-bold truncate">{videoFile?.name}</p>
                <p className="opacity-50">サイズ: {videoFile ? (videoFile.size / 1024 / 1024).toFixed(1) : 0} MB</p>
            </div>
            </div>
        </div>
        )}

        {/* 【ステップ3：最終確認画面】 */}
        {step === 3 && (
        <div className="max-w-2xl mx-auto bg-neutral/20 p-6 md:p-8 rounded-2xl border border-neutral/40 space-y-6">
            <h2 className="text-xl font-black text-center text-accent flex items-center justify-center gap-2">
            <i className="bi bi-file-earmark-check-fill"></i> 投稿内容の確認
            </h2>
            
            <div className="space-y-4 bg-base-300/40 p-5 rounded-xl border border-base-200">
            <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">動画タイトル</span>
                <p className="text-base font-bold text-base-content mt-0.5">{title}</p>
            </div>
            
            <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">動画ファイル名</span>
                <p className="text-xs font-mono text-info mt-0.5">{videoFile?.name}</p>
            </div>

            <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">概要欄</span>
                <p className="text-xs text-base-content whitespace-pre-wrap mt-0.5 leading-relaxed bg-neutral/30 p-3 rounded-lg min-h-[4rem]">
                {description || <span className="opacity-40 italic">説明はありません</span>}
                </p>
            </div>

            <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">サムネイル</span>
                <p className="text-xs text-base-content mt-0.5">
                {thumbnailFile ? `🖼️ ${thumbnailFile.name}` : "🎞️ 動画から自動生成されたサムネイルを使用します"}
                </p>
            </div>

            <div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">エンコード方法</span>
                <div className="mt-1 flex items-center gap-2">
                    {encodeType === "server-enc" ? (
                        <span className="badge badge-primary font-bold text-xs">サーバーでエンコード</span>
                    ) : (
                        <span className="badge badge-accent font-bold text-xs">自分でエンコード</span>
                    )}
                </div>
            </div>
            </div>

            {/* ナビゲーションボタン */}
            <div className="flex justify-between gap-4 pt-2">
            <button onClick={() => setStep(2)} className="btn btn-ghost font-bold">
                <i className="bi bi-arrow-left"></i> 修正する
            </button>
            <button onClick={handleFinalSubmit} className="btn btn-accent w-40 sm:w-52 font-black shadow-lg">
                <i className="bi bi-check-all text-lg"></i> 投稿
            </button>
            </div>
        </div>
        )}

    </div>
</div>
);
}
