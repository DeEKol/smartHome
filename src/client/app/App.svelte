<script lang="ts">
    import {HomePage} from "pages/HomePage";
    import Middlewares from "./providers/middlewares/Middlewares.svelte";
    import { Header } from "widgets/Header";
    import {Footer} from "widgets/Footer";

    // const envTest = import.meta.env.VITE_TEST;
</script>

<Middlewares>
    <main class="layout">
        <Header />
        <HomePage />
        <Footer />
    </main>
</Middlewares>
<style lang="scss">
    .layout {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: inherit;
      height: 100vh;
    }
</style>