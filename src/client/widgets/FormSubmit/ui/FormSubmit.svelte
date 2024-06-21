<script lang="ts">
  import { deviceApi } from "shared/clientApi/clientApi";
  import { type TDeviceType } from "../../../../common/DeviceTypes";
  import {devicesStore} from "app/providers/stores/stores";
  import {typesArr} from "widgets/Device/types";
  import {translation} from "widgets/Device/translation";

  export let x;
  export let y;
  export let closeModal;

  let name = '';
  let type: TDeviceType = 'bulb';
  let roomId;
  let iError;

  const xRound = Math.round(x);
  async function handleSubmit(event) {
    event.preventDefault();

    const startStatus = (_type: string) => {
      if (_type === "waterLink" || _type === "doorLink" || _type === "windowLink") {
        return "tracking"
      } else {
        return "disabled"
      }
    }

    try {
      const responseDevice = await deviceApi.create({
        name: String(name),
        type: String(type),
        x: Math.round(x - 20),
        y: Math.round(y - 20),
        isSmart: true,
        status: startStatus(type),
        roomId: +roomId,
      })

      devicesStore.update(prevState => [...prevState, responseDevice.data])


      iError = false;
      closeModal();
    } catch (error) {
      iError = true;
      console.warn(error);
    }
  }
</script>

<form on:submit={handleSubmit}>
  <label for="name">Имя:</label>
  <input type="text" id="name" bind:value={name} required />

  <label for="type">Тип:</label>
  <select id="type" bind:value={type} required>
    <option value="" disabled selected>Выберите тип</option>
    {#each typesArr as type}
      <option value={type}>{translation[type]}</option>
    {/each}
  </select>
  <input id="roomId" placeholder="id" type="number" bind:value={roomId} required />
  <button type="submit">Создать</button>
  {#if iError}
    <p>Ошибка</p>
  {/if}
</form>

<style>
</style>
