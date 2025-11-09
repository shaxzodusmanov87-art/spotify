// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://api.spotify.com/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

// Добавляем токен в каждый запрос
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Перехватываем ответы
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Удаляем токен и перенаправляем на логин
			localStorage.removeItem("token");
			window.location.assign("/login");
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
