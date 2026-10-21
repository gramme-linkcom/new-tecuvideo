"use client";

import { useState, useRef, useEffect } from "react";
import * as fabric from "fabric";

export default function CanvasFabricTestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const textObjectRef = useRef<fabric.IText | null>(null);

  const [commentText, setCommentText] = useState("完全Canvas管理の文字！");

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: width,
      height: height,
      backgroundColor: "#000000",
      selection: false,
    });
    fabricCanvasRef.current = canvas;

    const textComment = new fabric.IText(commentText, {
      left: width * 0.5,
      top: height * 0.5,
      fontFamily: "sans-serif",
      fill: "#ffffff",
      fontWeight: "bold",
      fontSize: 24,
      
      // 🌟【対策①】画面上での直接入力を「禁止」にする
      editable: false,
      

      shadow: new fabric.Shadow({
        color: "rgba(0, 0, 0, 1)",
        blur: 4,
        offsetX: 2,
        offsetY: 2,
      }),
      borderColor: "#3abff8",
      cornerColor: "#3abff8",
      cornerStyle: "circle",
      transparentCorners: false,
    });
    textObjectRef.current = textComment;

    canvas.add(textComment);
    canvas.setActiveObject(textComment);

const VISIBLE_MIN = 30;

canvas.on("object:moving", (e) => {
  const obj = e.target;
  if (!obj) return;

  obj.setCoords();

  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const bounds = obj.getBoundingRect();

  let left = obj.left!;
  let top = obj.top!;

  // =========================
  // 左：右端が30px以上残る
  // =========================
  const rightEdge = bounds.left + bounds.width;

  if (rightEdge < VISIBLE_MIN) {
    left += VISIBLE_MIN - rightEdge;
  }

  // =========================
  // 右：左端が右端-30px以内
  // =========================
  if (bounds.left > canvasWidth - VISIBLE_MIN) {
    left -= bounds.left - (canvasWidth - VISIBLE_MIN);
  }

  // =========================
  // 上：完全にはみ出し禁止
  // =========================
  if (bounds.top < 0) {
    top -= bounds.top;
  }

  // =========================
  // 下：完全にはみ出し禁止
  // =========================
  const bottomEdge = bounds.top + bounds.height;

  if (bottomEdge > canvasHeight) {
    top -= bottomEdge - canvasHeight;
  }

  obj.set({
    left,
    top,
  });

  obj.setCoords();
});

    const handleResize = () => {
      if (!containerRef.current || !fabricCanvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      fabricCanvasRef.current.setDimensions({ width: w, height: h });
      fabricCanvasRef.current.renderAll();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (textObjectRef.current && fabricCanvasRef.current) {
      textObjectRef.current.set("text", commentText);
      fabricCanvasRef.current.renderAll();
    }
  }, [commentText]);

  return (
    <div className="md:w-[80%] w-[95%] mx-auto py-10 min-h-screen space-y-6">
      <div className="flex items-center gap-3">
        <i className="bi bi-palette text-accent text-3xl"></i>
        <h1 className="text-2xl font-black tracking-wider text-base-content">
          Canvasコメントシステム：制限機能テスト
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <p className="text-xs opacity-70 flex items-center gap-1">
            <i className="bi bi-shield-lock text-warning"></i>
            ダブルクリックしても直接入力はできません。また、画面外に完全に引っ張っても、文字の端っこが必ず画面内に残ります！
          </p>
          <div ref={containerRef} className="w-full aspect-video rounded-2xl border-2 border-neutral-focus shadow-2xl overflow-hidden select-none">
            <canvas ref={canvasRef} className="block" />
          </div>
        </div>

        {/* 右側パネル */}
        <div className="space-y-4">
          <div className="bg-neutral/40 p-5 rounded-2xl border border-neutral/60 space-y-4 shadow-md">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <i className="bi bi-sliders"></i>
              Canvasテキスト設定
            </h2>
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-bold text-xs opacity-80">表示するテキスト</span>
              </label>
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:border-accent text-sm"
                placeholder="文字を入力"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
