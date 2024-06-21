<script lang="ts">
    import {authStore, devicesStore, homesStore, homeStore, userStore} from "app/providers/stores/stores";
    import { ButtonUI } from "shared/uis/ButtonUI";
    import {authApi, deviceApi, homeApi, roomsApi, userApi} from "shared/clientApi/clientApi";
    import { type TLoginResponse } from "../../../../common/AuthTypes";
    import { type AxiosResponse } from "axios";
    import { type TDeviceResponse } from "../../../../common/DeviceTypes";
    import {pathsApi} from "../../../../common/PathsApi";
    import {io} from "socket.io-client";

    let username;
    let password;
    let homename;

    let createHomeName;
    let temp = 20;

    // $: temp = $homeStore?.home?.temperature;

    let roomName;

    const onLogin = async (event) => {
        // event.preventDefault();
        if (username === '' || password === '') {
            authStore.set({error: 'Please fill in both fields.'});
        } else {
            authStore.set({error: undefined});

            try {
                const response: AxiosResponse<TLoginResponse> = await authApi.login({username: username, password: password});
                if (response.data.accessToken) {
                    userStore.set(response.data.user);
                    localStorage.setItem("accessToken", response.data.accessToken);
                    authStore.set({error: undefined});
                    location.reload();

                } else {
                  authStore.set({error:'Invalid username or password.'});

                }
            } catch (error) {
                authStore.set({error:error.response.data.message});
            }
        }
    }

  const onSignup = (event) => {
      event.preventDefault();

      try {
          userApi.create({username, password});

          authStore.set({error: ""})
      } catch (error) {
          authStore.set({error:error.response.data.message})
      }
  }

    const onLogout = () => {
        userStore.set({ id: undefined, username: "" });
        // homeStore.set({home: undefined, rooms: []});
        localStorage.removeItem("accessToken")
        // localStorage.removeItem("currentHomeName")
    }


    const roomsInHome = async (homename) => {
        try {
            const response = await roomsApi.findAllForHome(homename);
            const responseHome = await homeApi.findOneForName(homename);


            homeStore.set({
                home: responseHome.data,
                rooms: response.data
            });

            for (const room of $homeStore.rooms) {
                const responseDevices: AxiosResponse<TDeviceResponse[]> = await deviceApi.findOneForRoomId(room.id);
                devicesStore.update(prevState => [...prevState, ...responseDevices.data])
            }

            localStorage.setItem("currentHomeName", responseHome.data.name);
        } catch (error) {
            authStore.set({ error: error.message });
        }
    }

    const onClickOutHome = () => {
        homeStore.set({home: undefined, rooms: []});
        devicesStore.set([]);
        localStorage.removeItem("currentHomeName");
    }

    const onCreateHome = async (event) => {
        event.preventDefault();
        try {
            const response = await homeApi.create({name: createHomeName, temperature: Number(temp)})

            homesStore.update(prevState => [...prevState, response.data])

            createHomeName = ""
            temp = 20;
        } catch (error) {
            console.warn(error)
        }
    }

    const onCreateRoom = async (event) => {
        event.preventDefault();

        if ($homeStore.rooms.length <= 4) {
            try {
                const response = await roomsApi.create({name: roomName, homeId: $homeStore.home.id})

                homeStore.update(prevState => {
                    prevState.rooms.push(response.data)
                    return prevState;
                });

                createHomeName = ""
                temp = 20;
            } catch (error) {
                console.warn(error)
            }
        } else {
            console.warn("Too many rooms")
        }

    }

    const onChangeTemp = async () => {
        const socket = io("");

        socket.emit(pathsApi.temperature.setDegrees.path, {"degrees": temp, "homeId": $homeStore?.home.id})
        homeStore.update(prevState => {
            prevState.home.temperature = temp;
            return prevState;
        })
    }

    $: if (homename) roomsInHome(homename);


</script>

<div class="header">
    <div class="header__left-block">
    </div>
    <div class="header__center-block">
    </div>
    <div class="header__right-block">
        {#if $userStore?.id}
            {#if $homeStore.home?.id}
                <div class="rooms-block">
                        <div class="rooms-home">
                        <h4>Комнаты в доме</h4>
                            {#each $homeStore.rooms as room}
                                <div>№{room.id} Имя:{room.name}</div>
                            {/each}
                        </div>
                    <div class="rooms-create">
                    <p>Создать комнату</p>
                    <form class="form" on:submit|preventDefault={onCreateRoom}>
                        <div>
                            <label for="roomName">Название:</label>
                            <input type="text" id="roomName" bind:value={roomName} required>
                        </div>
                        <button type="submit">Создать комнату</button>
                    </form>
                    </div>
                </div>
                <div class="home-block">
                    <h4 class="home-block__title">Дом/Квартира/Офис</h4>
                    <p class="home-block__name">№: {$homeStore.home?.id} Имя: {$homeStore.home?.name}</p>
                    <p class="home-block__temperature">{$homeStore.home?.temperature}°</p>
                    <input type="number" min="-50" max="40" bind:value={temp} on:submit={() => console.log("ok")}/>
                    <ButtonUI onClick={onChangeTemp}>Изменить</ButtonUI>
                    <ButtonUI onClick={onClickOutHome}>Выйти</ButtonUI>
                </div>
                {:else}
                <div class="home-select-block">
                <select id="type" bind:value={homename} required>
                    <option value="" disabled selected>Выберите дом</option>
                    {#each $homesStore as home}
                        <option value={home.name}>{home.name}</option>
                    {/each}
                </select>
                    <form class="form" on:submit|preventDefault={onCreateHome}>
                        <div>
                            <label for="name">Название:</label>
                            <input type="text" id="name" bind:value={createHomeName} required>
                        </div>
                        <div>
                            <label for="temp">Температура:</label>
                            <input type="number" min="-50" max="40" id="temp" bind:value={temp} required>
                        </div>
                        <button type="submit">Создать дом</button>
                    </form>
                </div>
            {/if}
        {/if}
        <div class="user-block">
            {#if $userStore?.id}
                <div class="user-block__data">
                    <h4 class="user-block__title">Пользователь</h4>
                    <p class="user-block__number">Нормер: {$userStore.id}</p>
                    <p class="user-block__name">Имя: {$userStore.username}</p>
                  <ButtonUI onClick={onLogout} --color="#be0a0a">logout</ButtonUI>
                </div>
                {:else}
                <div>
                  <form class="form" on:submit|preventDefault={onLogin}>
                    <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" bind:value={username} required>
                    </div>
                    <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" bind:value={password} required>
                    </div>
<!--                    <button type="submit">Login</button>-->
                    <div class="user-block__buttons">
                      <ButtonUI onClick={onLogin}>signing</ButtonUI>
                      <ButtonUI onClick={onSignup}>signup</ButtonUI>
                    </div>
                  </form>
                  {#if $authStore.error}
                    <div class="error-message">{$authStore.error}</div>
                  {/if}
                </div>
            {/if}
        </div>
    </div>

</div>

<style lang="scss">
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: start;

      background-color: #8b8bd3;
      color: #abbccc;
      border-bottom: #3e6486 2px solid;

      padding: 6px;

      min-height: 110px;

      &__right-block {
        display: flex;
        flex-direction: row;
        gap: 20px;

        .home-block {
          &__temperature {
            font-weight: bolder;
            color: #be0a0a;
          }
        }

        .user-block {
          display: flex;
          flex-direction: row;
          gap: 10px;

          background-color: #3e6486;

          border-radius: 10px;
          padding: 10px;

          .user-block__buttons {
            display: flex;
            flex-direction: row;
            gap: 4px;
          }

          .form {
            display: flex;
            flex-direction: column;
          }

          .error-message {
            color: red;
          }
        }
      }

        .rooms-block {
          display: flex;
          gap: 20px;
        }

    }
</style>
