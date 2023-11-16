interface UserData {
    display_name: string;
    id: number;
    images: Image[];
}

interface Image {
    url: string;
}
interface NewRelease {
    albums: {
        items: Album[];
    };
}

interface Album {
    images: { url: string }[];
    // Add other properties as needed
}

const Content: React.FC<{ userData: UserData; newRelease: NewRelease }> = ({
    newRelease,
    userData
}) => {
    const menus = ["Discover", "My Library", "Radio"];

    console.log(userData);

    if (!userData) {
        return null;
    }

    return (
        <>
            <div className="p-6 relative h-full overflow-hidden">
                <div className="nav flex justify-between items-center z-10 relative">
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
                    <div className="flex gap-3 rounded-full p-2 px-5 bg-white bg-opacity-25 w-96 items-center text-slate-600">
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
                                    className="h-10 rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="h-10 w-10 aspect-square rounded-full flex justify-center items-center bg-slate-600 text-white font-bold">
                                {userData.display_name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full h-full absolute top-0 left-0 overflow-hidden z-0">
                    {/* Overlay Album Image */}
                    <img
                        src={newRelease?.albums?.items[0].images[0].url}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="overlay absolute top-0 w-full h-4/6 bg-gradient-to-b from-cyan-600 to-transparent p-4"></div>
                </div>
            </div>
        </>
    );
};

export default Content;
