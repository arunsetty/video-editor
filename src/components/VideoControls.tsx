import { observer } from 'mobx-react-lite';
import { RefObject } from 'react';
import ReactPlayer from 'react-player';

import { videoEditorStore } from '../store/VideoEditorStore';


const VideoControls = (props: { playerRef: RefObject<ReactPlayer> }) => {
    const { playerRef } = props;
    const { videoState } = videoEditorStore;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTimestampClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        const newTime = position * videoState.duration;
        videoEditorStore.setCurrentTime(newTime);
        playerRef.current?.seekTo(newTime);
    };

    const togglePlay = () => {
        videoEditorStore.setIsPlaying(!videoState.isPlaying);
    };

    return (
        <div className="bg-gray-800 p-2 rounded-t-lg">
            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className="text-white hover:text-blue-500"
                >
                    {videoState.isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
                <div className="text-white text-sm">
                    {formatTime(videoState.currentTime)} / {formatTime(videoState.duration)}
                </div>
                <div
                    className="flex-1 h-2 bg-gray-600 rounded cursor-pointer"
                    onClick={handleTimestampClick}
                >
                    <div
                        className="h-full bg-blue-500 rounded"
                        style={{
                            width: `${(videoState.currentTime / videoState.duration) * 100}%`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(VideoControls);