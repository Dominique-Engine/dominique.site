export const smooth = (v: number, target: number, smoothness: number) => {
    return v + (target - v) / smoothness;
}