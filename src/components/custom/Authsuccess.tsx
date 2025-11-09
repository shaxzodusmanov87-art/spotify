// AuthSuccess.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const AuthSuccess = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const accessToken = params.get("access_token");
		const refreshToken = params.get("refresh_token");

		if (accessToken) {
			localStorage.setItem("access_token", accessToken);
			localStorage.setItem("refresh_token", refreshToken || "");
			navigate("/"); // Редирект на главную
		} else {
			navigate("/error");
		}
	}, [location, navigate]);

	return <div>Loading...</div>;
};

export default AuthSuccess;
