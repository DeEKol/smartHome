<script lang="ts">
  import {devicesStore} from "app/providers/stores/stores";
  import {deviceApi} from "shared/clientApi/clientApi";
  import {type TDeviceResponse} from "../../../../common/DeviceTypes";
  import {typesArr} from "widgets/Device/types";
  import ButtonUI from "shared/uis/ButtonUI/ui/ButtonUI.svelte";

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

  const onHandleBtn = (device: TDeviceResponse) => {
      console.log(device)

      if (device.status === "disabled") device.status = "low";
      else if (device.status === "low") device.status = "medium"
      else if (device.status === "medium") device.status = "high";
      else if (device.status === "high") device.status = "low";

      devicesStore.update(prevState => {
          const index = prevState.findIndex(item => item.id === device.id);
          if (index !== 1) {
              prevState[index] = device;
          }
          return prevState;
      });

      deviceApi.update(device);
  }

  const onSwitch = () => {
    device.status = device.status === "disabled" ? "on" : "disabled";

    devicesStore.update(prevState => {
      const index = prevState.findIndex(item => item.id === device.id);
      if (index !== 1) {
        prevState[index] = device;
      }
      return prevState;
    });

    deviceApi.update(device);
  }

  const onClickBlob = () => {
      device.status = "leak";

      devicesStore.update(prevState => {
          const index = prevState.findIndex(item => item.id === device.id);
          if (index !== 1) {
              prevState[index] = device;
          }
          return prevState;
      });

      deviceApi.update(device);
  }

  const onClickLatchkey = () => {
      device.status = "hacked";

      devicesStore.update(prevState => {
          const index = prevState.findIndex(item => item.id === device.id);
          if (index !== 1) {
              prevState[index] = device;
          }
          return prevState;
      });

      deviceApi.update(device);
  }

</script>

{#if device}
  <div class="device" style="--top: {device.y}px; --left: {device.x}px;">
<!--    <p>{device.type}</p>-->
<!--    <p>{device.name} {device.id}</p>-->
    <img src={"shared/images/" + device.type + ".png"} class="img" alt="conditioner" />
    {#if device.type === "fan" || device.type === "radiatorControl" || device.type === "conditioner"}
        <button class="btn-smart" class:isNotSmart={!device.isSmart} on:click={() => onSmartBtn(device)}>smart</button>
        <button class="btn-handle" on:click={() => onHandleBtn(device)}>handle</button>
    {/if}
    {#if device.type === "bulb" || device.type === "switcher" || device.type === "socket"}
      <ButtonUI onClick={onSwitch}>switch</ButtonUI>
    {/if}
    {#if device.type === "waterLink"}
      <img class="img-blob" on:click={onClickBlob} src="shared/images/blob.png" alt="blob" />
    {/if}
      {#if device.type === "doorLink" || device.type === "windowLink"}
          <img class="img-blob" on:click={onClickLatchkey} src="shared/images/latchkey.png" alt="latchkey" />
      {/if}
    <p class="status" class:disabled={device.status === "disabled"}>{device.status}</p>
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

    .btn-handle {
      margin-top: 1px;
      background-color: #d2dce3;
      color: #3e6486;
      font-size: 12px;
      line-height: 12px;
      font-weight: bolder;
      cursor: pointer;
    }
    .status {
      color: #2d3296;
    }
    .disabled {
      color: #be0a0a;
    }
    .img-blob {
      position: absolute;
      top: -10px;
      left: 0;
      pointer-events: auto;
      cursor: pointer;
    }
  }
</style>
