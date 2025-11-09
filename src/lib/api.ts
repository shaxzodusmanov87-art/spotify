import axiosInstance from "./axios";

export async function fetchUserData() {
	try {
		const res = await axiosInstance.get("/me");
		const data = res.data;

		return {
			image: data?.images?.[0]?.url,
			name: data?.display_name,
		};
	} catch (e) {
		console.error("Ошибка при получении данных пользователя:", e);
	}
}

export async function fetchData(endpoint: string) {
	try {
		if (!endpoint) throw new Error("Endpoint was not set");
		const res = await axiosInstance.get(endpoint);
		const data = res.data;

		return data;
	} catch (e) {
		console.error("Ошибка при получении данных пользователя:", e);
	}
}
