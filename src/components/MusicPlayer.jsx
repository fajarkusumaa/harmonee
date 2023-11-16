import { useEffect, useRef, useState } from "react";

const MusicPlayer = ({ trackData, previewURL }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (previewURL) {
            const audioElement = audioRef.current;

            // Update duration and current time as the audio progresses
            const updateProgress = () => {
                setDuration(audioElement.duration);
                setCurrentTime(audioElement.currentTime);
            };

            audioElement.addEventListener("timeupdate", updateProgress);

            // Clean up the event listener when the component is unmounted
            return () => {
                audioElement.removeEventListener("timeupdate", updateProgress);
            };
        }
    }, []);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };

    useEffect(() => {
        setDuration(0);
    }, [previewURL]);

    console.log(trackData);

    return (
        <>
            <div className="flex items-center justify-between bg-slate-900 border-t-2 border-slate-800 w-full px-8">
                <div className="flex gap-2 items-center w-1/4">
                    <img
                        src={trackData?.album.images[2]?.url}
                        alt=""
                        className="rounded-full h-12"
                    />
                    <div>
                        <p className="line-clamp-1 font-semibold text-white">
                            {trackData.name}
                        </p>
                        <p className="text-white opacity-50">
                            {trackData.artists[0].name}
                        </p>
                    </div>
                </div>
                <div className="flex-1 flex w-full h-full justify-center items-center">
                    {previewURL && (
                        <>
                            <audio ref={audioRef} src={previewURL} />
                            <div className="flex items-center justify-between gap-5 w-full">
                                <div className="flex items-center gap-2 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                                        />
                                    </svg>

                                    <button
                                        onClick={togglePlayPause}
                                        className="p-2 border rounded-full flex justify-center items-center"
                                    >
                                        {!isPlaying ? (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                                    />
                                                </svg>
                                            </>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                                        />
                                    </svg>
                                </div>

                                <div className="flex items-center justify-between gap-4 text-white">
                                    <p className="relative left-1">
                                        {" "}
                                        {formatTime(currentTime)}
                                    </p>

                                    <input
                                        type="range"
                                        value={currentTime}
                                        max={duration || 0}
                                        onChange={handleTimeChange}
                                        className="w-96 px-2"
                                    />
                                    <p className="relative left-1">
                                        {" "}
                                        {formatTime(duration)}
                                    </p>
                                </div>
                            </div>{" "}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default MusicPlayer;
