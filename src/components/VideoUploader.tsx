import { videoEditorStore } from '../store/VideoEditorStore';


const VideoUploader = () => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            videoEditorStore.setVideo(file);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            videoEditorStore.setVideo(file);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-600 rounded-lg bg-gray-800 hover:border-blue-500 transition-all duration-200"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div className="text-center p-8">
                <p className="mb-2 text-xl font-semibold text-gray-200">
                    Drop your video here
                </p>
                <p className="mb-4 text-sm text-gray-400">
                    *All video formats
                </p>
                <div className="flex items-center justify-center">
                    <label className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8-4-4m0 0L8 8m4-4v12" /></svg>
                        Choose Video
                        <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={handleFileInput}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default VideoUploader;