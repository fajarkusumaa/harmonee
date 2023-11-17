import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const Content = ({ newRelease, userData, token }) => {
    const menus = ["Discover", "My Library", "Radio"];
    const [index, setIndex] = useState(0);
    const [artists, setArtists] = useState([]);
    const swiper = useSwiper();

    useEffect(() => {
        if (index === newRelease?.albums?.items.length - 1) {
            setIndex(0);
        } else {
            const intervalId = setInterval(() => {
                setIndex((prevIndex) => prevIndex + 1);
            }, 10000);

            // Clean up the interval when the component unmounts
            return () => {
                clearInterval(intervalId);
                // setIndex(0);
            };
        }
    }, []);

    useEffect(() => {
        if (token) {
            const artists = newRelease?.albums.items.map(
                (item) => item.artists[0]?.id
            );
            const artistID = artists?.join(",");
            console.log(artistID);

            const getArtistData = {
                method: "GET",
                url: "https://api.spotify.com/v1/artists?ids=" + artistID,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`
                }
            };

            axios
                .request(getArtistData)
                .then(function (response) {
                    setArtists(response.data);
                    console.log(response.data.artists.length);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }, [newRelease]);

    if (!userData) {
        return (
            <>
                <div>NO ARTIST</div>
            </>
        );
    }

    return (
        <>
            <div className="p-8 px-10 relative ease-in duration-150 overflow-hidden h-full flex flex-col justify-between">
                <div className="w-full h-full absolute top-0 left-0 overflow-hidden z-0">
                    {/* Overlay Album Image */}
                    <img
                        src={newRelease?.albums?.items[index].images[0].url}
                        alt=""
                        className="w-full h-full object-cover absolute"
                    />
                    {/*  */}
                    <div className="overlay absolute bottom-0 w-full h-full bg-gradient-to-b from-transparent from-20% to-slate-900 p-4"></div>

                    <div className="overlay absolute top-0 w-full h-2/3 bg-gradient-to-b from-slate-900 to-transparent p-4"></div>
                </div>

                <div className="nav flex justify-between items-center z-10 w-full">
                    <ul className=" flex gap-6 text-lg font-semibold text-slate-50">
                        {menus.map((menu, i) => {
                            return (
                                <li key={i}>
                                    <a href="">{menu}</a>
                                </li>
                            );
                        })}
                    </ul>
                    {/* Search */}
                    <div className="flex gap-3 rounded-full p-2 px-5 bg-white bg-opacity-10 w-96 items-center text-slate text-white">
                        {" "}
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
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                        <input
                            type="text"
                            className="bg-transparent border-none outline-none"
                        />
                    </div>

                    {/* Profile */}
                    <div className="profil">
                        {userData?.images[1] ? (
                            <div>
                                <img
                                    src={userData?.images[1]?.url}
                                    alt=""
                                    className="h-12 rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="h-12 w-12 aspect-square rounded-full flex justify-center items-center bg-slate-600 text-white font-bold">
                                {userData.display_name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex flex-col relative z-10 justify-between mt-16">
                    <div className="flex flex-col ">
                        <a
                            href=""
                            className="text-5xl w-3/4 leading-tight font-bold text-white line-clamp-1"
                        >
                            {" "}
                            {newRelease?.albums?.items[index].name}
                        </a>
                        <p className="font-semibold text-white opacity-80 mt-2">
                            {newRelease?.albums?.items[index].artists[0].name}
                        </p>
                    </div>

                    <div className="lex flex-col mt-2 ">
                        <p className="text-2xl w-3/4 leading-tight font-bold text-white mb-4">
                            Popular Artist
                        </p>
                        <div className="flex relative gap-4 overflow-x-scroll">
                            <Swiper spaceBetween={100} slidesPerView={6}>
                                {artists?.artists.length > 1 &&
                                    artists?.artists.map((artist, i) => (
                                        <SwiperSlide key={i}>
                                            {" "}
                                            <div>
                                                <div className="w-48">
                                                    <img
                                                        src={
                                                            artist.images[0].url
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <p className="w-full mt-3 text-white">
                                                    {artist.name}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;
