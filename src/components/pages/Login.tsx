import React from "react";

const CLIENT_ID = "4250d84acd1c4588ae599ade84fbf69b";
const REDIRECT_URI = "https://weproshakhzodspoty.netlify.app";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPES = ["user-read-private", "user-read-email", "playlist-modify-public"];

function generateRandomString(length: number) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const Login: React.FC = () => {

    const handleLogin = async () => {
        const codeVerifier = generateRandomString(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);
    
        localStorage.setItem("code_verifier", codeVerifier);
    
        const url = new URL(AUTH_ENDPOINT);
        url.searchParams.append("client_id", CLIENT_ID);
        url.searchParams.append("response_type", RESPONSE_TYPE);
        url.searchParams.append("redirect_uri", REDIRECT_URI);
        url.searchParams.append("scope", SCOPES.join(" "));
        url.searchParams.append("code_challenge_method", "S256");
        url.searchParams.append("code_challenge", codeChallenge);
    
        window.location.href = url.toString();
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
                
                    <button onClick={handleLogin} className="w-[300px] bg-[#1DB954] hover:bg-[#1ed760] transition-all duration-300 font-semibold py-3 rounded-full text-[18px] text-black ">
                        Continue with Spotify
                    </button>

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