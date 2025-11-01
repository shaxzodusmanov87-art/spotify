import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";

const CLIENT_ID = "4250d84acd1c4588ae599ade84fbf69b";
const REDIRECT_URI = "https://weproshakhzodspoty.netlify.app";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const Layout: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  async function fetchAccessToken(code: string) {
    const codeVerifier = localStorage.getItem("code_verifier");

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier || "",
    });

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = await response.json();
    console.log("Access Token Response:", data);
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
  }

  async function fetchUserData(token: string) {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log("User Data:", data);
    setUser(data);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const token = localStorage.getItem("access_token");

    if (token) {
      fetchUserData(token);
      return;
    }

    if (code) {
      fetchAccessToken(code).then(fetchUserData);
    }
  }, []);

  return (
    <div>
      <header>Header</header>
      <main>
        {user ? (
          <div>
            <h2>Welcome, {user.display_name}</h2>
            <img src={user.images?.[0]?.url} width={100} />
          </div>
        ) : (
          <p>Loading user...</p>
        )}
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default Layout