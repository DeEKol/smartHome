<script lang="ts">
  import { authStore, homesStore, homeStore, userStore } from "app/providers/stores/stores";
    import { ButtonUI } from "shared/uis/ButtonUI";
  import { authApi, homeApi, roomsApi } from "shared/clientApi/clientApi";
    import { type TLoginResponse } from "../../../../common/AuthTypes";
    import { type AxiosResponse } from "axios";

    let username;
    let password;
    let homename;

    const onLogin = async (event) => {
        event.preventDefault();
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
                } else {
                  authStore.set({error:'Invalid username or password.'});

                }
            } catch (error) {
                authStore.set({error:error.response.data.message});
            }
        }
    }

    const onLogout = () => {
        userStore.set({ id: undefined, username: "" });
        localStorage.removeItem("accessToken")
    }


    const roomsInHome = async (homename) => {
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

    const onClickOutHome = () => {
        homeStore.set({home: undefined, rooms: []});
        localStorage.removeItem("currentHomeName");
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
                    {#each $homeStore.rooms as room}
                        <h4>Комнаты в доме</h4>
                        <div>Комната: {room.name}</div>
                    {/each}
                </div>
                <div class="home-block">
                    <h4 class="home-block__title">Дом/Квартира/Офис</h4>
                    <p class="home-block__number">Нормер: {$homeStore.home?.id}</p>
                    <p class="home-block__name">Название: {$homeStore.home?.name}</p>
                    <p class="home-block__temperature">Температура: {$homeStore.home?.temperature}</p>
                    <ButtonUI onClick={onClickOutHome}>Выйти</ButtonUI>
                </div>
                {:else}
                <select id="type" bind:value={homename} required>
                    <option value="" disabled selected>Выберите дом</option>
                    {#each $homesStore as home}
                        <option value={home.name}>{home.name}</option>
                    {/each}
                </select>
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
                      <ButtonUI onClick={() => console.log("test")}>signup</ButtonUI>
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


    }
</style>
