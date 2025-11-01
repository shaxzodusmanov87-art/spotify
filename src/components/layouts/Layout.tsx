// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router";

// const CLIENT_ID = "4250d84acd1c4588ae599ade84fbf69b";
// const REDIRECT_URI = "https://weproshakhzodspoty.netlify.app";
// const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

// const Layout: React.FC = () => {
//   const [user, setUser] = useState<any>(null);

//   // --- Получаем токен по коду ---
//   async function fetchAccessToken(code: string) {
//     const codeVerifier = localStorage.getItem("code_verifier");

//     if (!codeVerifier) {
//       console.error("❌ Code verifier not found in localStorage");
//       return;
//     }

//     const body = new URLSearchParams({
//       client_id: CLIENT_ID,
//       grant_type: "authorization_code",
//       code,
//       redirect_uri: REDIRECT_URI,
//       code_verifier: codeVerifier,
//     });

//     const response = await fetch(TOKEN_ENDPOINT, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body,
//     });

//     const data = await response.json();
//     console.log("Access Token Response:", data);

//     if (data.access_token) {
//       localStorage.setItem("access_token", data.access_token);
//       return data.access_token;
//     } else {
//       console.error("❌ No access_token returned:", data);
//       return null;
//     }
//   }

//   // --- Получаем данные пользователя ---
//   async function fetchUserData(token: string) {
//     try {
//       const res = await fetch("https://api.spotify.com/v1/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         console.error("❌ Spotify API returned:", res.status, res.statusText);
//         if (res.status === 401) {
//           // Токен недействителен — удаляем и перезапрашиваем
//           localStorage.removeItem("access_token");
//           window.location.href = "/";
//         }
//         return;
//       }

//       const data = await res.json();
//       console.log("User Data:", data);
//       setUser(data);
//     } catch (err) {
//       console.error("❌ Failed to fetch user data:", err);
//     }
//   }

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("code");
//     const token = localStorage.getItem("access_token");

//     if (token) {
//       console.log("🔑 Using stored token");
//       fetchUserData(token);
//       return;
//     }

//     if (code) {
//       console.log("🎟 Exchanging code for token...");
//       fetchAccessToken(code).then((newToken) => {
//         if (newToken) {
//           fetchUserData(newToken);
//           // Очистим URL (убираем ?code=...)
//           window.history.replaceState({}, document.title, REDIRECT_URI);
//         }
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <header>Header</header>
//       <main>
//         {user ? (
//           <div>
//             <h2>Welcome, {user.display_name}</h2>
//             {user.images?.[0]?.url && (
//               <img src={user.images[0].url} alt="User avatar" width={100} />
//             )}
//           </div>
//         ) : (
//           <p>Loading user...</p>
//         )}
//         <Outlet />
//       </main>
//       <footer>Footer</footer>
//     </div>
//   );
// };

// export default Layout;