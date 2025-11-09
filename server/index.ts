import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import querystring from "querystring";

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(bodyParser.json());

var client_id = "4250d84acd1c4588ae599ade84fbf69b";
var redirect_uri = "http://127.0.0.1:3000/callback";
var client_secret = "56886fe988c6497990e31dbd32855a1c";
var stateKey = "some-state-of-my-choice";

// пример API как в Next.js
app.get("/login", (req, res) => {
	var scope = "playlist-modify-public user-library-read";

	res.redirect(
		"https://accounts.spotify.com/authorize?" +
			querystring.stringify({
				response_type: "code",
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				state: stateKey,
			})
	);
});
app.get("/callback", function (req, res) {
	var code = req.query.code || null;

	res.clearCookie(stateKey);

	(async () => {
		try {
			const bodyData = new URLSearchParams({
				code: code as string,
				redirect_uri,
				grant_type: "authorization_code",
			});

			const authHeader = Buffer.from(
				client_id + ":" + client_secret
			).toString("base64");

			const response = await fetch(
				"https://accounts.spotify.com/api/token",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: "Basic " + authHeader,
					},
					body: bodyData,
				}
			);

			if (!response.ok) {
				return res.redirect(
					"http://localhost:5173/error?" +
						querystring.stringify({
							error: "invalid_token",
						})
				);
			}

			const data = await response.json();
			const access_token = data.access_token;
			const refresh_token = data.refresh_token;

			// Редирект на фронт с токенами в URL
			res.redirect(
				"http://localhost:5173/auth/success?" +
					querystring.stringify({
						access_token: access_token,
						refresh_token: refresh_token,
					})
			);
		} catch (error) {
			console.error("Token exchange failed:", error);
			res.redirect(
				"http://localhost:5173/error?" +
					querystring.stringify({
						error: "token_request_failed",
					})
			);
		}
	})();
});

// запуск API на отдельном порту
app.listen(3000, () => console.log("API running at http://localhost:3000"));
