const Content = ({ newRelease }) => {
    console.log(newRelease.albums.items);
    return (
        <>
            <div className="p-4 relative h-full overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
                    {/* Overlay Album Image */}
                    <img
                        src={newRelease?.albums.items[0].images[0].url}
                        alt=""
                        className="w-full "
                    />
                    <div className="overlay absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-slate-800 to-transparent p-4"></div>
                </div>
            </div>
        </>
    );
};

export default Content;
