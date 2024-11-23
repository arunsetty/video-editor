import { makeAutoObservable } from 'mobx';
import { ZoomBlock, VideoState } from '../types';

class VideoEditorStore {
    videoState: VideoState = {
        url: null,
        duration: 0,
        currentTime: 0,
        isPlaying: false
    };

    zoomBlocks: ZoomBlock[] = [];

    selectedBlock: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setVideo(file: File) {
        this.videoState.url = URL.createObjectURL(file);
    }

    private checkOverlap(newStart: number, newEnd: number, excludeId?: string): boolean {
        return this.zoomBlocks.some(block => {
            if (block.id === excludeId) return false;
            return (
                (newStart >= block.startTime && newStart <= block.endTime) ||
                (newEnd >= block.startTime && newEnd <= block.endTime) ||
                (newStart <= block.startTime && newEnd >= block.endTime)
            );
        });
    }

    addZoomBlock(block: Omit<ZoomBlock, 'id'>) {
        if (this.checkOverlap(block.startTime, block.endTime)) {
            return false; // Block overlaps with existing blocks
        }

        this.zoomBlocks.push({
            ...block,
            id: crypto.randomUUID()
        });
        return true;
    }

    updateZoomBlock(id: string, updates: Partial<ZoomBlock>) {
        const index = this.zoomBlocks.findIndex(block => block.id === id);
        if (index === -1) return false;

        const updatedBlock = { ...this.zoomBlocks[index], ...updates };

        // Check for overlap only if time-related properties are being updated
        if (('startTime' in updates || 'endTime' in updates) &&
            this.checkOverlap(updatedBlock.startTime, updatedBlock.endTime, id)) {
            return false;
        }

        this.zoomBlocks[index] = updatedBlock;
        return true;
    }

    deleteZoomBlock(id: string) {
        this.zoomBlocks = this.zoomBlocks.filter(block => block.id !== id);
    }

    setCurrentTime(time: number) {
        this.videoState.currentTime = time;
    }

    setIsPlaying(isPlaying: boolean) {
        this.videoState.isPlaying = isPlaying;
    }

    setDuration(duration: number) {
        this.videoState.duration = duration;
    }

    selectBlock(id: string | null) {
        this.selectedBlock = id;
    }
}

export const videoEditorStore = new VideoEditorStore();