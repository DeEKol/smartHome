<script lang="ts">
    export let onClick: any;
</script>

<button class="btn" on:click={onClick}>
    <slot />
</button>

<style lang="scss">
    .btn {
      background-color: var(--background-color, #437943);
      color: var(--color, #dcdee0);
      border: 1px solid var(--border-color, #262b7c);
      border-radius: 8px;
    }
</style>
