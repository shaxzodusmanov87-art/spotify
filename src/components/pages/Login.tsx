
const Login: React.FC = () => {

    const handleLogin = async () => {
		window.location.href = "http://localhost:3000/login";
	};

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

                
                    <button
                        onClick={handleLogin}
                        className="w-[300px] bg-[#1DB954] hover:bg-[#1ed760] transition-all duration-300 font-semibold py-3 rounded-full text-[18px] text-black ">
                        Continue with Spotify
                    </button>
               

                <div className="w-full h-0.5 bg-neutral-400 flex items-center rounded-full  px-2 gap-2 my-2"></div>

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