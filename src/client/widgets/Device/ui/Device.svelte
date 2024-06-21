<script lang="ts">
  import {devicesStore} from "app/providers/stores/stores";
  import {deviceApi} from "shared/clientApi/clientApi";
  import {type TDeviceResponse} from "../../../../common/DeviceTypes";

  export let device;

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
</script>

{#if device}
  <div class="device" style="--top: {device.y}px; --left: {device.x}px;">
    <p>{device.type}</p>
    <p>{device.name} {device.id}</p>
    <img src={"shared/images/" + device.type + ".png"} class="img" alt="conditioner" />
    <button class="btn-smart" class:isNotSmart={!device.isSmart} on:click={() => onSmartBtn(device)}>smart</button>
    <p class:disabled={device.status === "disabled"}>{device.status}</p>
  </div>
{/if}

<style lang="scss">
  .device {
    position: absolute;

    top: var(--top, 0);
    left: var(--left, 0);

    display: flex;
    flex-direction: column;
    align-items: center;

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
  }
</style>
