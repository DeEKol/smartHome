<script lang="ts">
  import FormSubmit from "widgets/FormSubmit/ui/FormSubmit.svelte";
  import { Device } from "widgets/Device";
  import { devicesStore } from "app/providers/stores/stores";
  import ButtonUI from "shared/uis/ButtonUI/ui/ButtonUI.svelte";
  import {type TDeviceResponse} from "../../../../common/DeviceTypes";
  import {deviceApi} from "shared/clientApi/clientApi";
  import {translation} from "widgets/Device/translation";

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

  const onSmartBtn = (device: TDeviceResponse) => {
    device.isSmart = !device.isSmart;
    devicesStore.update(prevState => {
      const index = prevState.findIndex(item => item.id === device.id);
      if (index !== 1) {
        prevState[index] = device;
      }
      return prevState;
    });
    deviceApi.update(device)
  }

  const onDeleteDevice = async (deviceId: number) => {
    await deviceApi.delete(deviceId);

    devicesStore.update(prevState => {
      const removeById = (array, id) => {
        const index = array.findIndex(item => item.id == id);

        if (index !== -1) {
          array.splice(index, 1);
        }
        return array;
      }
      return removeById(prevState, deviceId);
    })
  }


</script>

<div class="home-page">
  <div class="floor-plan" on:click={handleClick}>
    <div class:disabled={!isCreateDevice} class="pointer" style="--x: {clickX}px; --y: {clickY}px;" />
    {#each $devicesStore as device}
      <Device device={device} />
    {/each}
  </div>
  <div class="home-page__right-block">
    <button class="btn-create" on:click={() => isCreateDevice = !isCreateDevice} class:active={isCreateDevice}>Создать девайс<br/>(после нажатия)<br/>(тык в карту)</button>
    <h3 class="room__subtitle">Список девайсов</h3>
    <div class="devices-block">
      {#each $devicesStore as device}
        <div class="device">
          <p>{translation[device.type]}</p>
          <p>{device.name} №{device.id}</p>
          <ButtonUI onClick={() => onDeleteDevice(device.id)}>delete</ButtonUI>
          <img src={"shared/images/" + device.type + ".png"} class="img" alt="conditioner" />
          <!--{#if device.type === "fan" || device.type === "radiatorControl" || device.type === "conditioner"}-->
          <!--  <button class="btn-smart" class:isNotSmart={!device.isSmart} on:click={() => onSmartBtn(device)}>smart</button>-->
          <!--{/if}-->
          <p class:disabled={device.status === "disabled"}>{device.status}</p>
        </div>
      {/each}
    </div>
  </div>

  {#if isOpenModal}
    <div class="modal">
      <h4>Создать устройство</h4>
      <FormSubmit closeModal={onModalClose} x={clickX} y={clickY} />
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
        min-height: 775px;
        min-width: 800px;
        background: rgba(0, 0, 0, 0.5);
      }

      &__right-block {
        display: flex;
        flex-direction: column;

        padding: 15px;
        gap: 20px;
      }
    }

    .floor-plan {
      position: relative;
      height: 775px;
      width: 800px;
      min-height: 775px;
      min-width: 800px;
      background-image: url("../../../shared/images/fp.jpg");

      background-size: contain;
      background-repeat: no-repeat;


      .pointer {
        position: absolute;
        height: 20px;
        width: 20px;
        background: #4c4ca9;

        border-radius: 50%;
        opacity: 0.5;


        top: var(--y, 20px);
        left: var(--x, 20px);

        &.disabled {
          display: none;
        }
      }
    }

    .devices-block {
      display: flex;
      flex-direction: row;
      gap: 6px;
      flex-wrap: wrap;

      .device {
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: #637a8f;
        border-radius: 8px;
        padding: 3px;
      }
    }
    .img {
      height: 44px;
      width: 44px;
    }
    .btn-smart {
      color: #437943;
      font-size: 14px;
      line-height: 14px;
      font-weight: bolder;
      padding: 1px;
      cursor: pointer;

      &.isNotSmart {
        color: #be0a0a;
        opacity: 0.5;
      }
    }
    .disabled {
      color: #be0a0a;
    }
</style>
