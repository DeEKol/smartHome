import App from "app/App.svelte";
import "app/styles/normalize.css";
import "app/styles/global.css";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
