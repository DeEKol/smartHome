<script lang="ts">
    import {HomePage} from "pages/HomePage";
    import Middlewares from "./providers/middlewares/Middlewares.svelte";
    import { Header } from "widgets/Header";
    import {Footer} from "widgets/Footer";
    import {homeStore, userStore} from "app/providers/stores/stores";

    // const envTest = import.meta.env.VITE_TEST;
</script>

<Middlewares>
    <main class="layout">
        <Header />
        {#if $userStore.id && $homeStore?.home?.id && $homeStore?.rooms.length !== 0}
            <HomePage />

            {:else}
            <h2>Зарегистрируйтесь/залогиньтесь, выберите/создайте дом, выберете/создайте комнаты и устанавливайте девайсы умного дома</h2>
            <div>
                <h3>Описание:</h3>
                <p>* Смарт режим (венлилятор, кондиционер, батарея) - если включен, то с помощью веб сокетов меняет скорость работы девайсов при изменении темературы в доме</p>
                <p>* Термометр следит за температурой в помещении</p>
                <p>* Лампочка, розетка и выключатель - имеют положение выключен/включен</p>
                <p>* Датчики протечки и открытия - уходят в режим протек и взломан</p>
            </div>
        {/if}
        <!--{#if $homeStore?.home?.id}-->
            <Footer />
            <!--{:else}-->
<!--            <div />-->
<!--        {/if}-->
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