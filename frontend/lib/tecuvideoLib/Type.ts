export type CommentItem = {
    text: string;
    rotation: number;
    pos: {
        x: number;
        y: number;
    };
    scale: {
        x: number;
        y: number;
    };
};

export type CommentCanvasOptions = {
    width: number;
    height: number;
};
