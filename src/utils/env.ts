export const env = () => {
    const mode: string = import.meta.env.VITE_MODE || "development";
    const defaultBlockScale: number = parseFloat(import.meta.env.VITE_DEFAULT_BLOCK_SCALE || 1.5);
    const scaleMin: number = parseFloat(import.meta.env.VITE_SCALE_MIN || 1);
    const scaleMax: number = parseFloat(import.meta.env.VITE_SCALE_MAX || 3);
    const scaleStep: number = parseFloat(import.meta.env.VITE_SCALE_STEP || 0.1);
    const minBlockWidthPercent: number = parseFloat(import.meta.env.VITE_MIN_BLOCK_WIDTH_PERCENT || 2);

    return {
        mode,
        defaultBlockScale,
        scaleMin,
        scaleMax,
        scaleStep,
        minBlockWidthPercent,
    }
}