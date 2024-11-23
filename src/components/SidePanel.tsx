import { observer } from 'mobx-react-lite';

import { videoEditorStore } from '../store/VideoEditorStore';

import { formatTime } from '../utils';
import { env } from '../utils/env';


const SidePanel = () => {
    const { selectedBlock, zoomBlocks } = videoEditorStore;

    const scaleMin = env().scaleMin;
    const scaleMax = env().scaleMax;
    const scaleStep = env().scaleStep;


    const renderBlockEditor = (block: typeof zoomBlocks[0]) => {

        const handleChange = (key: keyof typeof block, value: number) => {
            const success = videoEditorStore.updateZoomBlock(block.id, { [key]: value });
            if (!success && (key === 'startTime' || key === 'endTime')) {
                alert('Error: Overlapping blocks while updating from side panel');
            }
        };

        return (
            <div className="space-y-3 p-4 bg-gray-800/50 rounded-lg mt-2">
                <label className="block">
                    Start Time
                    <input
                        type="number"
                        value={block.startTime}
                        onChange={(e) => handleChange('startTime', +e.target.value)}
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        className="w-full bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </label>

                <label className="block">
                    End Time
                    <input
                        type="number"
                        value={block.endTime}
                        onChange={(e) => handleChange('endTime', +e.target.value)}
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                        className="w-full bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </label>

                <label className="block">
                    Scale
                    <div className="flex gap-2">
                        <input
                            type="range"
                            min={scaleMin}
                            max={scaleMax}
                            step={scaleStep}
                            value={block.scale}
                            onChange={(e) => handleChange('scale', +e.target.value)}
                            className="flex-1"
                        />
                        <input
                            type="number"
                            min={scaleMin}
                            max={scaleMax}
                            step={scaleStep}
                            value={block.scale}
                            onChange={(e) => handleChange('scale', +e.target.value)}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            className="w-20 bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                </label>

                <div className="flex gap-2">
                    <label className="flex-1">
                        X
                        <input
                            type="number"
                            value={block.x}
                            onChange={(e) => handleChange('x', +e.target.value)}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            className="w-full bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </label>

                    <label className="flex-1">
                        Y
                        <input
                            type="number"
                            value={block.y}
                            onChange={(e) => handleChange('y', +e.target.value)}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            className="w-full bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </label>
                </div>

                <button
                    onClick={() => videoEditorStore.deleteZoomBlock(block.id)}
                    className="w-full bg-red-500/80 text-white rounded-lg py-2 mt-4 transition-colors duration-150 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Delete Block
                </button>
            </div>
        );
    };


    return (
        <div className="space-y-4 h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-100">Zoom Blocks</h2>

            {zoomBlocks.length === 0 ? (
                <div className="text-gray-400 text-center mt-4 p-8 border-2 border-dashed border-gray-700 rounded-lg">
                    Click on the timeline to add a zoom block
                </div>
            ) : (
                <div className="space-y-3 overflow-y-auto flex-1">
                    {[...zoomBlocks]
                        .sort((a, b) => a.startTime - b.startTime)
                        .map((zoomBlock) => (
                            <div
                                key={zoomBlock.id}
                                className={`border rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg 
                                    ${selectedBlock === zoomBlock.id
                                        ? 'border-blue-500 bg-gray-800/50'
                                        : 'border-gray-700 hover:border-gray-500'
                                    }`}
                            >
                                <button
                                    className="w-full px-4 py-3 flex justify-between items-center transition-colors duration-150 hover:bg-gray-700/50"
                                    onClick={() => videoEditorStore.selectBlock(
                                        selectedBlock === zoomBlock.id ? null : zoomBlock.id
                                    )}
                                >
                                    <span className="font-medium">
                                        {formatTime(zoomBlock.startTime)} - {formatTime(zoomBlock.endTime)}
                                    </span>
                                    <span className={`text-gray-400 transform transition-transform duration-200 ${selectedBlock === zoomBlock.id ? 'rotate-90' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6" /></svg>
                                    </span>
                                </button>
                                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${selectedBlock === zoomBlock.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {selectedBlock === zoomBlock.id && renderBlockEditor(zoomBlock)}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default observer(SidePanel);