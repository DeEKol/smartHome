<script lang="ts">
  import { deviceApi } from "shared/clientApi/clientApi";
  import { type TDeviceType } from "../../../../common/DeviceTypes";

  let name = '';
  let type: TDeviceType = 'bulb';

  // Создание массива строк для селектора
  const typesArr = ["bulb", "switcher", "thermostat", "fan", "conditioner",
    "socket", "waterLink", "doorLink", "windowLink", "radiatorControl"] as const;
  // Утилита для проверки соответствия
  function checkTypeAliases<T extends readonly string[]>(array: T) {
    return array;
  }
  // Проверка, что массив включает все алиасы из типа
  export const typeAliases: TDeviceType[] = checkTypeAliases(typesArr);

  export let x;
  export let y;
  const xRound = Math.round(x);
  function handleSubmit(event) {
    event.preventDefault();
    console.log('Имя:', name);
    console.log('Тип:', type);
    console.log('x:', x);
    console.log('y:', y);

    deviceApi.create({
      name: name,
      type: type,
      x: 12,
      y: 31,
      isSmart: true,
      status: "disabled",
      roomId: 1,
    })
  }
</script>

<form on:submit={handleSubmit}>
  <label for="name">Имя:</label>
  <input type="text" id="name" bind:value={name} required />

  <label for="type">Тип:</label>
  <select id="type" bind:value={type} required>
    <option value="" disabled selected>Выберите тип</option>
    {#each typesArr as type}
      <option value={type}>{type}</option>
    {/each}
  </select>

  <button type="submit">Отправить</button>
</form>

<style>
</style>
