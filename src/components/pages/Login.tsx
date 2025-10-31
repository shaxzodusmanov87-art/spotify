
const Login: React.FC = () => {

    const spotify = {
        // client_id: "f2e286ece2574ad6b334b55d03764483",
        // REDIRECT_URI: "https://weprospoty.netlify.app/",
        client_id: "Dcfe923b2d660439caf2b557b21f31221",
        REDIRECT_URI: "http://localhost:5173",
        AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
        RESPONSE_TYPE: "token",
        token: ""
    }

    return (
        <div className="w-full h-screen bg-black flex justify-center items-center font-sans">
            <div className="w-[420px] bg-neutral-900 rounded-2xl px-10 py-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                    <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
                        className="h-10"
                    />
                </div>

                <h1 className="text-white text-2xl font-bold mt-2">
                    Log in to Spotify
                </h1>

                <a href={`${spotify.AUTH_ENDPOINT}?client_id=${spotify.client_id}&redirect_uri=${spotify.REDIRECT_URI}&response_type=${spotify.RESPONSE_TYPE}&scope=playlist-modify-public`}>
                    <button className="w-[300px] bg-[#1DB954] hover:bg-[#1ed760] transition-all duration-300 font-semibold py-3 rounded-full text-[18px] text-black ">
                        Continue with Spotify
                    </button>
                </a>

                <div className="w-full h-0.5 bg-neutral-700 my-2"></div>

                <p className="text-gray-400 text-[13px] text-center">
                    <span>By continuing, you agree to Spotify's </span>
                    <span className="text-white hover:underline cursor-pointer">Terms of Service </span>
                    <span>and </span>
                    <span className="text-white hover:underline cursor-pointer">
                        Privacy Policy.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;