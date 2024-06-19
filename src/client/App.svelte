<script lang="ts">
    import { HelloResponse} from "../common/HelloResponse";

    let name = "world";
    let fetchTest: HelloResponse;

    const envTest = import.meta.env.VITE_TEST;

    fetch("/api/hello")
        .then<HelloResponse>((response) => response.json())
        .then((value) => fetchTest = value);

</script>

<main>
    <h1>Hello {name}!</h1>
    {#if fetchTest}
        <p>{fetchTest.text}</p>
    {/if}
    <p>{envTest}</p>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: red;
    }
</style>