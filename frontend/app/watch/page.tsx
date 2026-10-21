"use client";

import { useRef, useEffect, useState } from "react";
import { commentCanvas } from "@/lib/tecuvideoLib/commentCanvas";

export default function CanvasFabric() {
    const commentCanvasRef = useRef<commentCanvas | null>(null);
    const commentInput = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const btn1 = useRef<HTMLButtonElement>(null);
    const btn2 = useRef<HTMLButtonElement>(null);
    
    const CANVAS_WIDTH  = 1920;
    const CANVAS_HEIGHT = 1080;

    type Btn1Status = "ランダム配置" | "キャンセル";
    type Btn2Status = "配置" | "投稿";

    const [btn1Status, setBtn1Status] = useState<Btn1Status>("ランダム配置");
    const [btn2Status, setBtn2Status] = useState<Btn2Status>("配置");

    const btn1Clk = () => {
        if (!commentCanvasRef.current || !commentInput.current){
            console.log(commentInput.current);
            return;
        } 
        
        switch(btn1Status){
            case "ランダム配置":
                if (commentInput.current.value === "") break;
                commentCanvasRef.current.addComment(commentInput.current.value);
                commentInput.current.value = "";
                commentInput.current?.setAttribute("disabled", "true");
                setBtn1Status("キャンセル");
                setBtn2Status("投稿");
                break;
            
            case "キャンセル":
                setBtn1Status("ランダム配置");
                setBtn2Status("配置");
                commentInput.current?.removeAttribute("disabled");
                btn1.current?.setAttribute("disabled", "true");
                btn2.current?.setAttribute("disabled", "true");
                break;
        }
    }

    const btn2Clk = () => {}
    
    const handleInputChange = () => {
        if (!commentInput.current) return;
        if (commentInput.current.value === "") {
            btn1.current?.setAttribute("disabled", "true");
            btn2.current?.setAttribute("disabled", "true");
        } else {
            btn1.current?.removeAttribute("disabled");
            btn2.current?.removeAttribute("disabled");
        }
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        btn1.current?.setAttribute("disabled", "true");
        btn2.current?.setAttribute("disabled", "true");

        const CommentCanvas = new commentCanvas(canvasRef.current, {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        commentCanvasRef.current = CommentCanvas;

        

        return () => {
            commentCanvasRef.current = null;
        };
    }, [])

    return (
        <main className="bg-base-300 space-y-10 pb-16">
            <div>
                <div className="relative w-full">
                    <video className="block w-full" src="./temp/sm45383604.mp4" ref={videoRef}></video>
                    <canvas className="absolute top-0 left-0 w-full h-full" id="commCanvas" ref={canvasRef}></canvas>
                </div>
                <div className="w-full flex justify-center">
                    <div className="join w-[95%] mt-2">
                        <input type="text" placeholder="コメントを入力" className="join-item input input-bordered w-[90%]" ref={commentInput} onChange={handleInputChange}/>
                        <button className="join-item btn btn-info ml-1" onClick={btn1Clk} ref={btn1}>{btn1Status}</button>
                        <button className="join-item btn btn-info ml-1" onClick={btn2Clk} ref={btn2}>{btn2Status}</button>
                    </div>
                </div>
                <div className="mx-auto mt-2 w-[95%]">
                    <h1 className="text-3xl">タイトル</h1>
                    <div className="flex sm:flex-row flex-col mt-5">
                        <div className="flex-1">
                            <p className="text-xs">投稿日: 2025/01/01</p>
                            <div className="flex mt-3 text-sm">
                                <p>
                                    <i className="bi bi-play mr-1"></i>
                                    1.6万回
                                </p>
                                <p className="ml-5">
                                    <i className="bi bi-chat-dots mr-1"></i>
                                    128
                                </p>
                                <p className="ml-5">
                                    <i className="bi bi-hand-thumbs-up mr-1"></i>
                                    1024万
                                </p>
                            </div>
                        </div>
                        <div className="flex-none my-auto text-2xl bg-base-100 p-1 rounded-3xl mt-2 sm:mt-0 w-fit">
                            <div className="flex px-1">
                                <button className="items-center justify-center w-10 h-10 rounded-full hover:bg-base-300 transition-colors duration-200 mx-1">
                                    <i className="bi bi-hand-thumbs-up"></i>
                                    <span className="sr-only">いいね！</span>
                                </button>
                                <button className="items-center justify-center w-10 h-10 rounded-full hover:bg-base-300 transition-colors duration-200 mx-1">
                                    <i className="bi bi-hand-thumbs-down"></i>
                                    <span className="sr-only">わるいいね...</span>
                                </button>
                                <button className="items-center justify-center w-10 h-10 rounded-full hover:bg-base-300 transition-colors duration-200 mx-1">
                                    <i className="bi bi-share"></i>
                                    <span className="sr-only">共有</span>
                                </button>
                                <button className="items-center justify-center w-10 h-10 rounded-full hover:bg-base-300 transition-colors duration-200 mx-1">
                                    <i className="bi bi-flag"></i>
                                    <span className="sr-only">報告</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <span className="divider my-2 h-1"></span>
                    <div className="bg-base-100 h-fit rounded-md">
                        <div className="mx-5 py-3">
                            <p>
                                概要欄だよ！！
                                <br />
                                特に書くことはないよ！
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
