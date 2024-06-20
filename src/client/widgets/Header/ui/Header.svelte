<script lang="ts">
    import { homesStore } from "app/providers/stores/stores";
    import { ButtonUI } from "shared/uis/ButtonUI";

</script>

<div class="header">
    <div class="header__left-block">
    </div>
    <div class="header__center-block">
    </div>
    <div class="header__right-block">
        {#if $homesStore && $homesStore.length !== 0}
            <div class="home-block">
                <h4 class="home-block__title">Дом/Квартира/Офис</h4>
                <p class="home-block__number">Нормер: {$homesStore[0].id}</p>
                <p class="home-block__name">Название: {$homesStore[0].name}</p>
                <p class="home-block__temperature">Температура: {$homesStore[0].temperature}</p>
            </div>
        {/if}
        <div class="user-block">
            <div class="user-block__data">
                <h4 class="user-block__title">Пользователь</h4>
                <p class="user-block__number">Нормер: 1</p>
                <p class="user-block__name">Имя: Валентин</p>
            </div>
            <div class="user-block__buttons">
                <ButtonUI onClick={() => console.log("test")}>signing</ButtonUI>
                <ButtonUI onClick={() => console.log("test")}>signup</ButtonUI>
                <ButtonUI onClick={() => console.log("test")} --color="#be0a0a">logout</ButtonUI>
            </div>
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
            flex-direction: column;
            gap: 4px;
          }
        }
      }


    }
</style>