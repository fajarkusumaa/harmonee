import { useEffect, useState } from "react";
import "./App.css";

import SpotifyAPI from "./utils/SpotifyAPI.jsx";
import axios from "axios";

function App() {
    const [token, setToken] = useState<string>();
    const [userData, setUserData] = useState<string>("");

    console.log(userData);

    const [playlistURL, setPlaylistURL] = useState<string>();

    useEffect(() => {
        const getUserData = {
            method: "GET",
            url: "https://api.spotify.com/v1/me",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + token
            }
        };

        axios
            .request(getUserData)
            .then(function (response) {
                setUserData(response.data);
            })
            .catch(function (error) {
                console.error("error get data user", error);
            });

        console.log(userData);

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

    // Define the getPlaylistItem function

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

    const [playlist, setPlaylist] = useState<string>();

    return (
        <>
            {!token ? (
                <SpotifyAPI
                    token={token}
                    setToken={setToken}
                    setUserData={setUserData}
                />
            ) : (
                <>
                    <div className="h-screen w-screen ">
                        <div className="w-full h-full flex">
                            {/* Sidebar */}
                            <div className="w-1/4 bg-slate-900 h-full p-8 flex flex-col gap-4">
                                {/* Logo */}
                                <div>
                                    <img
                                        src="/public/logo.svg"
                                        alt=""
                                        className="h-6"
                                        draggable={false}
                                    />
                                </div>

                                <div className="flex flex-col gap-6">
                                    {/* Menu */}
                                    <p className="text-lg text-white font-bold mt-5">
                                        Playlist
                                    </p>
                                    <div className="flex flex-col gap-4 mt-3">
                                        <a
                                            href=""
                                            className="text-white flex text-base items-center text-cyan-400"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 me-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                                />
                                            </svg>
                                            My Playlist
                                        </a>

                                        <a
                                            href=""
                                            className="text-white flex text-base items-center "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 me-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                                />
                                            </svg>
                                            My Playlist
                                        </a>

                                        <a
                                            href=""
                                            className="text-white flex text-base items-center"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 me-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                                />
                                            </svg>
                                            My Playlist
                                        </a>
                                    </div>

                                    {!token &&
                                        playlist.map((item, id) => (
                                            <a
                                                key={id}
                                                className="flex flex-col gap-4 "
                                            >
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-lg text-slate-500"></span>
                                                    <img
                                                        src={item.images[2].url}
                                                        alt=""
                                                    />
                                                    <div>
                                                        {/* Song Title */}
                                                        <p className="text-base text-white">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-white opacity-40">
                                                            Judul Album
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-3/4 bg-slate-700 h-full flex flex-col">
                                <img src="" alt="" />
                            </div>
                        </div>
                        {/* Player */}
                    </div>
                </>
            )}
        </>
    );
}

export default App;
