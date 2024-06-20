<script lang="ts">
    // ? Загрузка данных при старте и запись в сторы, открываем слушатели сокетов для обновления данных

    import {onMount} from "svelte";
    import {type AxiosResponse} from "axios";
    import {type THomeResponse} from "../../../../common/HomeTypes";
    import {deviceApi, homeApi} from "shared/clientApi/clientApi";
    import {devicesStore, homesStore} from "../stores/stores";
    import {type TDeviceResponse} from "../../../../common/DeviceTypes";
    import {io} from "socket.io-client";
    import {pathsApi} from "../../../../common/PathsApi";

    onMount(async () => {
        const socket = io("");

        socket.on(pathsApi.temperature.setDegrees.path, (data) => {
            console.log(data)
            // ? Обновляем температуру дома в сторе при изменнии температуры
            homesStore.update((prevState) => {
                const index = prevState.findIndex(item => item.id === data.home.id);
                if (index !== 1) {
                    prevState[index] = data.home;
                }
                return prevState;
            })

            // ? Обновляем статусы девайсов в сторе при изменнии температуры
            devicesStore.update((prevState) => {
                const newState = prevState;

                data.devices.forEach((device: TDeviceResponse) => {
                    const index = newState.findIndex(item => {
                        return item.id === device.id
                    });
                    if (index !== -1) {
                        newState[index] = device;
                    }
                })
                return newState;
            })
        })

        try {
            const response: AxiosResponse<THomeResponse[]> = await homeApi.findAll();
            homesStore.set([...response.data])
        } catch (error) {
            console.warn(error)
        }

        try {
            const response: AxiosResponse<TDeviceResponse[]> = await deviceApi.findAll();
            devicesStore.set([...response.data])
        } catch (error) {
            console.warn(error)
        }
    })

</script>

<slot />