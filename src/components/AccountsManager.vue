<template>
  <div class="accounts">
    <div class="title">
      <h5>Учетные записи</h5>
      <q-btn
        icon="add"
        color="primary"
        @click="addAccount"
      />
    </div>

    <div class="description">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <div class="accounts-header-table">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
      <div>Действие</div>
    </div>
    <q-button label="asd" />
    
    <q-form
      class="accounts-table"
      @submit="saveAccounts"
    >
      <div
        v-for="(account, idx) in accounts"
        :key="idx"
        class="accounts-table-item"
      >
        <q-input
          v-model="account.mark"
          label="Метка"
          :rules="[ val => val.length <= 50 || 'Максимум 50 символов']"
        />
        <q-select
          v-model="account.type"
          :options="typePasswordOptions"
          emit-value
          map-options
          label="Тип"
        />
        <q-input
          v-model="account.login"
          label="Логин"
          :rules="[
            val => (!!val && val.length <= 100) || 'Максимум 100 символов'
          ]"
          :style="account.type === 'ldap' ? 'width: 40%' : 'width: 20%'"
        />
        <q-input
          v-if="account.type === 'local'"
          v-model="account.password"
          label="Пароль"
          :rules="[
            val => ((!!val && val.length <= 100) || account.type === 'ldap') || 'Максимум 100 символов'
          ]"
          :type="account.isPassword ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="account.isPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="account.isPassword = !account.isPassword"
            />
          </template>
        </q-input>
        <q-btn
          icon="remove"
          flat
          @click="removeAccount(idx)"
        />
      </div>
      <q-btn
        color="primary"
        type="submit"
        style="margin-top: 20px;"
      >
        Сохранить
      </q-btn>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from 'src/stores/accounts-store'
import { nextTick, onMounted } from 'vue'

// Не совсем понял, эту строчку:
// Все поля сохраняются в текстовом виде, кроме поле Метка. Оно должно преобразовываться в массив,
// где один элемент это строковое значение до ;. В массиве должен лежать объект, где поле text
// равно одному элементу метки - ({ text: элемент метки })

// Есть идея, что должно быть реализовано как у меня, только при сохранении в localStorage
// записывается не в виде массива ['example1', 'example2'], а вот в таком формате:
// [ { text: 'example1' }, { text: 'example2' } ]

const typePasswordOptions = [
  { value: 'local', label: 'Локальная' },
  { value: 'ldap', label: 'LDAP' }
]

const { accounts, removeAccount, addAccount, saveAccounts, loadAccounts } = useAccountsStore()

onMounted(async () => {
  loadAccounts()
  await nextTick()
})
</script>

<style scoped lang="scss">
.accounts {
  min-width: 1000px;

  .title {
    display: flex;
    gap: 20px;

    h5 {
      margin: 0;
    }
  }

  .description {
    margin-top: 20px;
  }

  &-header-table {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    div {
      width: 20%;
      padding: 0 10px;
    }

    :last-child {
      text-align: end;
    }
  }

  &-table {
    margin-top: 5px;
    &-item {
      display: flex;
    }

    &-item > :nth-child(n) {
      width: 20%;
      padding: 0 10px;
    }
  }
}
</style>