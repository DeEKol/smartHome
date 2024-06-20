<script lang="ts">
    import {homesStore} from "../../../app/providers/stores/stores";

</script>

<div class="home-page">
    <h2>
        Home Page
    </h2>
    {#if $homesStore && $homesStore.length !== 0}
        <div>{$homesStore[0].name}</div>
        <div>{$homesStore[0].temperature}</div>
    {/if}
</div>

<style lang="scss">
    .home-page {
      height: 100%;
    }
</style>