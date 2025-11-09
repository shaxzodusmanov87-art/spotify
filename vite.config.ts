import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const host = env.VITE_HOST || "127.0.0.1"; // fallback если не задан

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			host,
			proxy: {
				"/api": `http://${host}:3000`, // автоматически подставляется текущий хост
			},
		},
	};
});
