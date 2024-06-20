import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";
import { config as dotenvConfig} from "dotenv";
import {sveltePreprocess} from "svelte-preprocess";
import * as process from "process";

const envFilePath = path.resolve(__dirname, ".env");
const envResult = dotenvConfig( { path: envFilePath });

export default defineConfig({
    root: "src/client",
    plugins: [svelte({
        preprocess: sveltePreprocess({
            scss: {},
            typescript: {
                tsconfigFile: "./tsconfig.svelte.json",
            },
        })
    })],
    optimizeDeps: {
        include: ["**/*.svg"],
    },
    resolve: {
        alias: {
            "app": path.resolve(__dirname, "src/client/app"),
            "pages": path.resolve(__dirname, "src/client/pages"),
            "widgets": path.resolve(__dirname, "src/client/widgets"),
            "features": path.resolve(__dirname, "src/client/features"),
            "entities": path.resolve(__dirname, "src/client/entities"),
            "shared": path.resolve(__dirname, "src/client/shared"),
        }
    },
    define: {
        'process.env': { ...envResult.parsed },
    },
    server: {
        host: '0.0.0.0',
        port: Number(process.env.CLIENT_PORT),
        proxy: {
            '/api': {
                target: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api^\//, '')
            },
            '/socket.io': {
                target: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/socket.io^\//, '')
            }
        }
    },
    build: {
        outDir: '../../dist/client',
        assetsDir: '.',
        sourcemap: false,
        emptyOutDir: true,
    },
})