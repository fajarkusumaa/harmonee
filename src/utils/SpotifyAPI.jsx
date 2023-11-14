// SpotifyAPI.js
import axios from "axios";
import React, { useEffect } from "react";

const SpotifyAPI = ({ token, setToken, setUserData, userData }) => {
    const CLIENT_ID = "eeb3aa5f41a24a408d944e97df56766c";
    const CLIENT_SECRET = "c4da42aa8ad74a26a6e7407af0985c87";
    const REDIRECT_URI = "http://localhost:5173/callback";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?";
    const RESPONSE_TYPE = "code";

    const SCOPE = [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-playback-position",
        "user-top-read",
        "user-read-recently-played",
        "user-read-email",
        "user-read-private"
    ];
    const handleLogin = () => {
        window.location.href = `${AUTH_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE.join(
            " "
        )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
    };

    useEffect(() => {
        const hash = window.location.href;
        const url = "https://accounts.spotify.com/api/token";
        console.log(hash);

        if (hash) {
            let regex = /[?&]code=([^&#]*)/i;
            let match = regex.exec(hash);
            let code = match && match[1];

            console.log(code);

            fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    code: code,
                    redirect_uri: REDIRECT_URI,
                    grant_type: "authorization_code"
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setToken(data.access_token);
                })
                .catch((error) => {
                    console.error("Error exchanging code for token:", error);
                    // Handle the error as needed
                });
        }
    }, []);

    return (
        <div>
            {!token ? (
                <button onClick={handleLogin}>Fetch Data from Spotify</button>
            ) : null}
        </div>
    );
};

export default SpotifyAPI;
