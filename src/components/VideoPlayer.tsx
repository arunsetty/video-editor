import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import ReactPlayer from 'react-player';

import { videoEditorStore } from '../store/VideoEditorStore';

import VideoControls from './VideoControls';


const VideoPlayer = () => {
    const { videoState, zoomBlocks } = videoEditorStore;
    const playerRef = useRef<ReactPlayer>(null);

    const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
        videoEditorStore.setCurrentTime(playedSeconds);
    };

    const handleDuration = (duration: number) => {
        videoEditorStore.setDuration(duration);
    };

    const getCurrentZoomBlock = () => {
        // Get the zoom block that is currently being played
        return zoomBlocks.find(
            block =>
                videoState.currentTime >= block.startTime &&
                videoState.currentTime <= block.endTime
        );
    };

    const activeZoomBlock = getCurrentZoomBlock();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="relative flex-1">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="w-full h-full"
                            style={{
                                transform: activeZoomBlock
                                    ? `scale(${activeZoomBlock.scale})` // Scale can't be done in tailwind because tailwind is compiled to css and css doesn't support dynamic scaling
                                    : 'none',
                                transformOrigin: 'center',
                                transition: 'transform 0.3s ease-out'
                            }}
                        >
                            <div
                                className="w-full h-full"
                                style={{
                                    transform: activeZoomBlock
                                        ? `translate(${activeZoomBlock.x}px, ${activeZoomBlock.y}px)`
                                        : 'none',
                                    transition: 'transform 0.3s ease-out'
                                }}
                            >
                                <ReactPlayer
                                    ref={playerRef}
                                    url={videoState.url || ''}
                                    playing={videoState.isPlaying}
                                    onProgress={handleProgress}
                                    onDuration={handleDuration}
                                    onEnded={() => videoEditorStore.setIsPlaying(false)}
                                    width="100%"
                                    height="100%"
                                    controls={false} // Using custom controls
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Video Controls since the default ones don't work well while zooming */}
            <VideoControls playerRef={playerRef} />
        </div>
    );
};

export default observer(VideoPlayer);