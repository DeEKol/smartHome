<script lang="ts">
  import FormSubmit from "widgets/FormSubmit/ui/FormSubmit.svelte";
  import { Device } from "widgets/Device";
  import { devicesStore } from "app/providers/stores/stores";

  let clickX = 0;
  let clickY = 0;

  let isCreateDevice = false;
  let isOpenModal = false;

  function handleClick(event) {
    const rect = event.target.getBoundingClientRect();
    clickX = event.clientX - rect.left;
    clickY = event.clientY - rect.top;
    console.log(clickX, clickY);

    if (isCreateDevice) {
      isOpenModal = true;
    }
  }

  const onModalClose = () => {
    isCreateDevice = false;
    isOpenModal = false;
    clickX = 0;
    clickY = 0;
  }
</script>

<div class="home-page">
  <div class="floor-plan" on:click={handleClick}>
    <div class="test" style="--x: {clickX}px; --y: {clickY}px;">sss</div>
    {#each $devicesStore as device}
      <Device device={device} />
    {/each}
  </div>
  <div>
    <button class="btn-create" on:click={() => isCreateDevice = !isCreateDevice} class:active={isCreateDevice}>Создать девайс</button>
  </div>

  {#if isOpenModal}
    <div class="modal">
      <h4>Создать устройство</h4>
      <FormSubmit x={clickX} y={clickY} />
      <button class="btn-close" on:click={onModalClose}>закрыть</button>
    </div>
  {/if}
  {#if isOpenModal}
    <div class="backdoor"></div>
  {/if}
</div>


<style lang="scss">
    .home-page {
      height: 100%;
      display: flex;
      flex-direction: row;

      .btn-create {
        &.active {
          background: green;
        }
      }

      .modal {
        position: absolute;
        height: 200px;
        width: 200px;
        background: rgba(78, 124, 116, 0.82);

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;

        .btn-close {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      .backdoor {
        position: absolute;
        height: 775px;
        width: 800px;
        background: rgba(0, 0, 0, 0.5);
      }
    }

    .floor-plan {
      position: relative;
      height: 775px;
      width: 800px;
      background-image: url("../../../shared/images/fp.jpg");

      background-size: contain;
      background-repeat: no-repeat;


      .test {
        position: absolute;
        height: 20px;
        width: 20px;
        background: red;

        top: var(--y, 20px);
        left: var(--x, 20px);

      }
    }

</style>
