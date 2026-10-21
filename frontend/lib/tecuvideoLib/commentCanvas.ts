import type { CommentItem, CommentCanvasOptions } from "./Type";

export class commentCanvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, options: CommentCanvasOptions) {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("CanvasRenderingContext2D を取得できませんでした");
        }

        this.canvas = canvas;
        this.ctx = ctx;

        this.canvas.width  = options.width;
        this.canvas.height = options.height;
    }

    async waitFontReady(font: string) {
        await document.fonts.load(font);
        await document.fonts.ready;

        const isReady = document.fonts.check(font);

        return isReady;
    }

    async addComment(text: string) {
        await this.waitFontReady('120px "Gen Interface JP"');

        this.ctx.font = '120px "Gen Interface JP"';
        this.ctx.fillStyle = "white";

        const screenCenter: CommentCanvasOptions = {
            width: this.canvas.width / 2,
            height: this.canvas.height / 2
        }
        const metrics = this.ctx.measureText(text);

        const position: CommentCanvasOptions = {
            width: screenCenter.width - metrics.width / 2,
            height: screenCenter.height
        }

        this.ctx.fillText(text, position.width, position.height);

        
    }
}
