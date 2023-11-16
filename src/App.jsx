import { useEffect, useState } from "react";
import "./App.css";

import SpotifyAPI from "./utils/SpotifyAPI.jsx";
import axios from "axios";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Content from "./components/Content.js";

function App() {
    const [token, setToken] = useState();
    const [userData, setUserData] = useState("");
    const [playlistSong, setPlaylistSong] = useState();
    const [playlist, setPlaylist] = useState();

    const [active, setActive] = useState();
    const [playlistURL, setPlaylistURL] = useState();

    const [newRelease, setNewRelease] = useState();

    useEffect(() => {
        const getNewRelease = {
            method: "GET",
            url: "https://api.spotify.com/v1/browse/new-releases",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .request(getNewRelease)
            .then(function (response) {
                setNewRelease(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [token]);

    useEffect(() => {
        const getPlaylist = {
            method: "GET",
            url: "https://api.spotify.com/v1/me/playlists",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .request(getPlaylist)
            .then(function (response) {
                setPlaylistURL(response.data.href);
                console.log(playlistURL);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [token]);

    useEffect(() => {
        const getPlaylistItem = {
            method: "GET",
            url: `${playlistURL}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .request(getPlaylistItem)
            .then(function (response) {
                setPlaylist(response.data.items);
                console.log(playlist);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [playlistURL]);

    const handlePlaylistSong = (url) => {
        const getSong = {
            method: "GET",
            url: url + "?limit=10",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .request(getSong)
            .then(function (response) {
                setPlaylistSong(response.data.items);
                console.log(response.data.items);
            })
            .catch(function (error) {
                console.log("error fetching song", error);
            });
    };

    const [previewURL, setPreviewURL] = useState();
    const [trackData, setTrackData] = useState();

    const handlePlaySong = (idTrack) => {
        const getTrack = {
            method: "GET",
            url: "https://api.spotify.com/v1/tracks/" + idTrack,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`
            }
        };

        axios
            .request(getTrack)
            .then(function (response) {
                setPreviewURL(response.data.preview_url);
                setTrackData(response.data);
            })
            .catch(function (error) {
                console.log("error fetching song", error);
            });
    };

    return (
        <>
            {!token ? (
                <SpotifyAPI
                    token={token}
                    setToken={setToken}
                    setUserData={setUserData}
                    handlePlaySong={handlePlaySong}
                />
            ) : (
                <>
                    <div className="h-screen w-screen flex flex-col overflow-hidden">
                        {/* Main Content */}
                        <div className="w-full flex flex-1 h-5/6">
                            {/* Sidebar */}
                            <div className="w-1/4 bg-slate-900 p-8 pt-0 flex flex-col gap-4 h-full">
                                {/* Logo */}
                                {/* <div>
                                    <img
                                        src="/public/logo.svg"
                                        alt=""
                                        className="h-6"
                                        draggable={false}
                                    />
                                </div> */}

                                <div className="flex flex-col flex-1 gap-6 overflow-hidden">
                                    {/* Menu */}
                                    <p className="text-lg text-white font-bold mt-5">
                                        Playlist
                                    </p>
                                    {/* List Playlist */}
                                    {playlist &&
                                        playlist.length >= 1 &&
                                        playlist.map((item, id) => (
                                            <a
                                                key={id}
                                                className={`${
                                                    active === id
                                                        ? "text-cyan-400"
                                                        : "text-white"
                                                } flex gap-4 hover:text-cyan-400 cursor-pointer items-center ease-in-out duration-150`}
                                                onClick={() => {
                                                    handlePlaylistSong(
                                                        item.tracks.href
                                                    );

                                                    setActive(id);
                                                }}
                                            >
                                                {active === id ? (
                                                    <span className="ps-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-4 h-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                                            />
                                                        </svg>
                                                    </span>
                                                ) : (
                                                    <span className="text-base text-center ps-3">
                                                        ◦
                                                    </span>
                                                )}

                                                <div className="flex gap-2 items-center">
                                                    <span className="text-lg text-slate-500"></span>

                                                    <div>
                                                        {/* Song Title */}
                                                        <p className="text-base">
                                                            {item?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    {/* ----------- */}

                                    <hr className="border-slate-600" />

                                    <div className="flex flex-col gap-3 overflow-y-scroll track">
                                        {/* Playlist Song */}
                                        {playlistSong &&
                                            playlistSong.length >= 1 &&
                                            playlistSong.map((item, i) => (
                                                <a
                                                    key={i}
                                                    className="flex gap-4 cursor-pointer p-2 hover:bg-slate-700"
                                                    onClick={() =>
                                                        handlePlaySong(
                                                            item?.track.id
                                                        )
                                                    }
                                                >
                                                    {/* <span className="text-lg text-slate-500 flex justify-center items-center bg-slate-600 p-3 aspect-square">
                                                        {i + 1}
                                                    </span> */}

                                                    <div className="flex gap-2 items-center">
                                                        <img
                                                            src={
                                                                item?.track
                                                                    .album
                                                                    ?.images[2]
                                                                    ?.url
                                                            }
                                                            className="h-12"
                                                            alt=""
                                                        />

                                                        <div>
                                                            {/* Song Title */}
                                                            <p className="text-base text-white line-clamp-1">
                                                                {
                                                                    item?.track
                                                                        .name
                                                                }
                                                            </p>

                                                            <span className="text-xs text-white opacity-50">
                                                                {item?.track.artists.map(
                                                                    (
                                                                        artist,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                artist.name
                                                                            }
                                                                            {index <
                                                                                item
                                                                                    .track
                                                                                    .artists
                                                                                    .length -
                                                                                    1 &&
                                                                                ", "}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}{" "}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-3/4 bg-slate-700 flex flex-col h-full overflow-hidden">
                                <Content
                                    newRelease={newRelease}
                                    userData={userData}
                                />
                            </div>
                        </div>

                        {/* Player */}
                        {trackData && (
                            <div className="h-24 flex bg-slate-900 border-t-2 border-slate-800 relative z-20">
                                <MusicPlayer
                                    trackData={trackData}
                                    previewURL={previewURL}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default App;
