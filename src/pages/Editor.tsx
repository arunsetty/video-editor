import { observer } from 'mobx-react-lite';

import { videoEditorStore } from '../store/VideoEditorStore';

import VideoPlayer from '../components/VideoPlayer';
import Timeline from '../components/Timeline';
import VideoUploader from '../components/VideoUploader';
import SidePanel from '../components/SidePanel';


const Editor = () => {
    const { videoState } = videoEditorStore;

    return (
        <div className="flex h-screen bg-gray-900">
            <div className="flex-1 flex flex-col p-4">
                {!videoState.url ? (
                    <VideoUploader />
                ) : (
                    <div className="flex flex-col flex-1">
                        <div className="flex-1">
                            <VideoPlayer />
                        </div>
                        <div className="h-28">
                            <Timeline />
                        </div>
                    </div>
                )}
            </div>
            <div className="w-80 bg-gray-800 p-4">
                <SidePanel />
            </div>
        </div>
    );
};

export default observer(Editor);