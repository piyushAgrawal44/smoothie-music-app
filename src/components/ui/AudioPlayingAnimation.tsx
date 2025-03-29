const AudioPlayingAnimation = ({className}:{className?:string}) => {
    return (
        <div className={`flex space-x-1 h-4 ${className}`}>
            <div className="w-1 bg-green-600 animate-equalizer1"></div>
            <div className="w-1 bg-green-700 animate-equalizer2"></div>
            <div className="w-1 bg-green-600 animate-equalizer3"></div>
        </div>
    );
};

export default AudioPlayingAnimation;
