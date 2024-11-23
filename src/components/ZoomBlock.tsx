import { observer } from 'mobx-react-lite';

import { videoEditorStore } from '../store/VideoEditorStore';

import type { ZoomBlock as ZoomBlockType } from '../types';

import { env } from '../utils/env';


const ZoomBlock = (props: { block: ZoomBlockType, duration: number }) => {
    const { block, duration } = props;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        videoEditorStore.selectBlock(block.id);
    };

    const MIN_WIDTH_PERCENT = env().minBlockWidthPercent;
    const MIN_WIDTH_TIME = (MIN_WIDTH_PERCENT / 100) * duration;

    const handleResize = (e: React.MouseEvent, direction: 'left' | 'right') => {
        e.stopPropagation();

        const timelineElement = document.querySelector('.timeline');
        if (!timelineElement) return;

        const timelineWidth = timelineElement.clientWidth;
        const startX = e.clientX;
        const initialStartTime = block.startTime;
        const initialEndTime = block.endTime;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const timeDelta = (deltaX / timelineWidth) * duration;

            if (direction === 'left') {
                const newStartTime = Math.max(0, initialStartTime + timeDelta);
                if (newStartTime < initialEndTime - MIN_WIDTH_TIME) {
                    videoEditorStore.updateZoomBlock(block.id, {
                        startTime: newStartTime,
                        endTime: initialEndTime
                    });
                }
            }
            else {
                const newEndTime = Math.min(duration, initialEndTime + timeDelta);
                if (newEndTime > initialStartTime + MIN_WIDTH_TIME) {
                    videoEditorStore.updateZoomBlock(block.id, {
                        startTime: initialStartTime,
                        endTime: newEndTime
                    });
                }
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const left = `${(block.startTime / duration) * 100}%`;
    const width = `${((block.endTime - block.startTime) / duration) * 100}%`;
    const isSelected = videoEditorStore.selectedBlock === block.id;

    return (
        <div
            className={`absolute h-full transition-colors ${isSelected ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-blue-500 opacity-50 hover:opacity-70'} focus:outline-none`}
            style={{ left, width }}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label={`Zoom block from ${formatTime(block.startTime)} to ${formatTime(block.endTime)}`}
            onKeyDown={(e) => {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    videoEditorStore.deleteZoomBlock(block.id);
                }
            }}
        >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {formatTime(block.startTime)} - {formatTime(block.endTime)}
            </div>

            <div className="absolute left-0 w-2 h-full bg-blue-700 cursor-ew-resize hover:w-3 transition-all hover:bg-blue-800"
                onMouseDown={(e) => handleResize(e, 'left')}
            />
            <div className="absolute right-0 w-2 h-full bg-blue-700 cursor-ew-resize hover:w-3 transition-all hover:bg-blue-800"
                onMouseDown={(e) => handleResize(e, 'right')}
            />
        </div>
    );
};

export default observer(ZoomBlock);