export type WallpaperId = "aurora" | "laguna" | "hutan" | "malam";

export type Band = {
    left: number;
    top: number;
    w: number;
    h: number;
    color: string;
    rot: number;
    dx: string;
    dy: string;
    dur: number;
};
export type Layer = { depth: number; blur: number; bands: Band[] };

export const URUTAN_WALLPAPER: WallpaperId[] = ["aurora", "laguna", "hutan", "malam"];

export const WALLPAPER: Record<WallpaperId, { nama: string; layers: Layer[] }> = {
    aurora: {
        nama: "Aurora (bawaan)",
        layers: [
            {
                depth: 12,
                blur: 110,
                bands: [
                    { left: -10, top: 4, w: 80, h: 40, color: "rgb(11 127 134 / .6)", rot: -16, dx: "6%", dy: "8%", dur: 80 },
                    { left: 30, top: 50, w: 75, h: 40, color: "rgb(24 181 138 / .35)", rot: -20, dx: "-6%", dy: "-6%", dur: 95 },
                ],
            },
            {
                depth: 26,
                blur: 70,
                bands: [
                    { left: -12, top: 58, w: 60, h: 20, color: "rgb(24 181 138 / .5)", rot: -14, dx: "8%", dy: "-10%", dur: 65 },
                    { left: 50, top: 26, w: 50, h: 18, color: "rgb(184 242 58 / .3)", rot: -22, dx: "-8%", dy: "10%", dur: 75 },
                ],
            },
            {
                depth: 44,
                blur: 36,
                bands: [
                    { left: 8, top: 20, w: 55, h: 6, color: "rgb(45 212 191 / .35)", rot: -19, dx: "5%", dy: "40%", dur: 55 },
                    { left: 52, top: 66, w: 38, h: 5, color: "rgb(184 242 58 / .35)", rot: -21, dx: "-6%", dy: "-50%", dur: 60 },
                ],
            },
        ],
    },
    laguna: {
        nama: "Laguna",
        layers: [
            {
                depth: 12,
                blur: 110,
                bands: [
                    { left: -5, top: 10, w: 85, h: 42, color: "rgb(10 90 130 / .55)", rot: -12, dx: "7%", dy: "6%", dur: 85 },
                    { left: 25, top: 48, w: 80, h: 42, color: "rgb(11 127 134 / .5)", rot: -18, dx: "-7%", dy: "-5%", dur: 100 },
                ],
            },
            {
                depth: 26,
                blur: 70,
                bands: [
                    { left: -10, top: 60, w: 55, h: 20, color: "rgb(45 212 191 / .35)", rot: -14, dx: "8%", dy: "-10%", dur: 70 },
                    { left: 48, top: 24, w: 52, h: 18, color: "rgb(24 181 138 / .3)", rot: -20, dx: "-8%", dy: "10%", dur: 78 },
                ],
            },
            {
                depth: 44,
                blur: 36,
                bands: [
                    { left: 6, top: 22, w: 58, h: 6, color: "rgb(45 212 191 / .4)", rot: -17, dx: "5%", dy: "40%", dur: 58 },
                    { left: 50, top: 68, w: 40, h: 5, color: "rgb(125 220 240 / .3)", rot: -19, dx: "-6%", dy: "-50%", dur: 62 },
                ],
            },
        ],
    },
    hutan: {
        nama: "Hutan",
        layers: [
            {
                depth: 12,
                blur: 110,
                bands: [
                    { left: -12, top: 8, w: 80, h: 42, color: "rgb(16 100 66 / .6)", rot: -20, dx: "6%", dy: "8%", dur: 82 },
                    { left: 32, top: 50, w: 78, h: 42, color: "rgb(24 181 138 / .4)", rot: -24, dx: "-6%", dy: "-6%", dur: 96 },
                ],
            },
            {
                depth: 26,
                blur: 70,
                bands: [
                    { left: -14, top: 56, w: 62, h: 22, color: "rgb(24 181 138 / .45)", rot: -16, dx: "8%", dy: "-10%", dur: 66 },
                    { left: 46, top: 22, w: 54, h: 20, color: "rgb(184 242 58 / .38)", rot: -23, dx: "-8%", dy: "10%", dur: 74 },
                ],
            },
            {
                depth: 44,
                blur: 36,
                bands: [
                    { left: 10, top: 24, w: 52, h: 6, color: "rgb(184 242 58 / .32)", rot: -21, dx: "5%", dy: "40%", dur: 56 },
                    { left: 50, top: 66, w: 40, h: 5, color: "rgb(45 212 191 / .3)", rot: -18, dx: "-6%", dy: "-50%", dur: 61 },
                ],
            },
        ],
    },
    malam: {
        nama: "Malam",
        layers: [
            {
                depth: 12,
                blur: 110,
                bands: [
                    { left: -10, top: 6, w: 80, h: 40, color: "rgb(11 127 134 / .22)", rot: -16, dx: "6%", dy: "8%", dur: 90 },
                    { left: 34, top: 52, w: 74, h: 40, color: "rgb(24 181 138 / .14)", rot: -20, dx: "-6%", dy: "-6%", dur: 105 },
                ],
            },
            {
                depth: 26,
                blur: 70,
                bands: [
                    { left: 50, top: 28, w: 50, h: 18, color: "rgb(45 212 191 / .12)", rot: -22, dx: "-8%", dy: "10%", dur: 80 },
                ],
            },
        ],
    },
};