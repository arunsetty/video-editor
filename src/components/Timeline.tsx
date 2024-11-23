import { observer } from 'mobx-react-lite';

import { videoEditorStore } from '../store/VideoEditorStore';

import ZoomBlock from './ZoomBlock';
import { env } from '../utils/env';


const Timeline = () => {
    const { videoState, zoomBlocks } = videoEditorStore;

    const handleAddZoomBlock = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const clickTime = (clickPosition / rect.width) * videoState.duration;

        const minBlockWidthPercent = env().minBlockWidthPercent;
        const defaultDuration = (minBlockWidthPercent / 100) * videoState.duration;
        const defaultScale = env().defaultBlockScale;

        const success = videoEditorStore.addZoomBlock({
            startTime: clickTime,
            endTime: clickTime + defaultDuration,
            x: 0,
            y: 0,
            scale: defaultScale
        });

        if (!success) {
            alert('Error: Overlapping blocks while updating from timeline');
        }
    };

    return (
        <div className="w-full h-full bg-gray-800 p-2 rounded-b-lg">
            <div className="w-full flex justify-between text-gray-400 text-sm mb-1 px-2">
                <span>0:00</span>
                <span>{Math.floor(videoState.duration / 60)}:{String(Math.floor(videoState.duration % 60)).padStart(2, '0')}</span>
            </div>

            <div
                className="timeline relative w-full h-12 bg-gray-700 rounded cursor-pointer overflow-hidden"
                onClick={handleAddZoomBlock}
            >
                <div className="absolute inset-0 grid grid-cols-12 gap-0">
                    <div className="border-l border-gray-600 h-full" />
                </div>

                {zoomBlocks.map(block => (
                    <ZoomBlock
                        key={block.id}
                        block={block}
                        duration={videoState.duration}
                    />
                ))}

                <div
                    className="absolute top-0 w-0.5 h-full bg-red-500 shadow-lg"
                    style={{
                        left: `${(videoState.currentTime / videoState.duration) * 100}%`,
                        filter: 'drop-shadow(0 0 2px rgba(239, 68, 68, 0.5))'
                    }}
                />
            </div>

            <div className="mt-1 text-gray-400 text-sm px-2">
                Current: {Math.floor(videoState.currentTime / 60)}:{String(Math.floor(videoState.currentTime % 60)).padStart(2, '0')}
            </div>
        </div>
    );
};

export default observer(Timeline);