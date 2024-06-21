<script lang="ts">
    // ? Загрузка данных при старте и запись в сторы, открываем слушатели сокетов для обновления данных

    import {onMount} from "svelte";
    import {type AxiosResponse} from "axios";
    import {type THomeResponse} from "../../../../common/HomeTypes";
    import { authApi, deviceApi, homeApi, roomsApi } from "shared/clientApi/clientApi";
    import {authStore, devicesStore, homesStore, homeStore, userStore} from "../stores/stores";
    import {type TDeviceResponse} from "../../../../common/DeviceTypes";
    import {io} from "socket.io-client";
    import {pathsApi} from "../../../../common/PathsApi";
    import { type TUserResponse } from "../../../../common/UserTypes";

    onMount(async () => {
        try {
          const roomsInHome = async () => {
            const homename = localStorage.getItem("currentHomeName");

            try {
              const response = await roomsApi.findAllForHome(homename);
              const responseHome = await homeApi.findOneForName(homename);

              homeStore.set({
                home: responseHome.data,
                rooms: response.data
              });

              localStorage.setItem("currentHomeName", responseHome.data.name);
            } catch (error) {
              authStore.set({ error: error.message });
            }
          }

          await roomsInHome();
        } catch (error) {
          console.log(error);
        }


        try {
            const response: AxiosResponse<TUserResponse> = await authApi.check();
            userStore.set(response.data);
        } catch (e) {
            authStore.set({ error: e.message });
            userStore.set({
                id: undefined,
                username: "",
            });
        }

        const socket = io("");

        socket.on(pathsApi.temperature.setDegrees.path, (data) => {
            // ? Обновляем температуру дома в сторе при изменнии температуры
            homesStore.update((prevState) => {
                const index = prevState.findIndex(item => item.id === data.home.id);
                if (index !== 1) {
                    prevState[index] = data.home;
                }
                return prevState;
            })

            homeStore.update((prevState) => {
                prevState.home.temperature = data.home.temperature;
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
            for (const room of $homeStore.rooms) {
                const response: AxiosResponse<TDeviceResponse[]> = await deviceApi.findOneForRoomId(room.id);
                devicesStore.update(prevState => [...prevState, ...response.data])
            }
        } catch (error) {
            console.warn(error)
        }
    })

</script>

<slot />
