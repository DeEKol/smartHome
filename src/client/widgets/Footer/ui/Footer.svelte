<script lang="ts">
    import {devicesStore} from "app/providers/stores/stores";
    import {deviceApi} from "shared/clientApi/clientApi";
    import {type TDeviceResponse} from "../../../../common/DeviceTypes";

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

<div class="footer">
    <div class="footer__rooms">
        <div class="room">
            <h4 class="room__title">Room 1</h4>
            <h5 class="room__subtitle">Список девайсов</h5>
            <div class="devices-block">
                {#each $devicesStore as device}
                    <div class="device">
                        <p>{device.type}</p>
                        <p>{device.name} {device.id}</p>
                        <img src={"shared/images/" + device.type + ".png"} class="img" alt="conditioner" />
                        <button class="btn-smart" class:isNotSmart={!device.isSmart} on:click={() => onSmartBtn(device)}>smart</button>
                        <p class:disabled={device.status === "disabled"}>{device.status}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .footer {
      background-color: #dadaea;
      color: #2970b0;
      border-top: #3e6486 2px solid;

      padding: 10px;

      .devices-block {
        display: flex;
        flex-direction: row;
        gap: 6px;

        .device {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
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