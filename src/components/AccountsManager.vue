<template>
  <div class="accounts">
    <h5>Учетные записи</h5>

    <div>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <div class="accounts-header-table">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
    </div>
    <q-button label="asd" />
    
    <div class="accounts-table">
      <div
        v-for="(account, idx) in accounts"
        :key="idx"
        class="accounts-table-item"
      >
        <q-input
          v-model="account.mark"
          label="Метка"
        />
        <q-select
          v-model="account.type"
          label="Тип"
        />
        <q-input
          v-model="account.login"
          label="Логин"
        />
        <q-input
          v-if="account.type === 'local'"
          v-model="account.password"
          label="Пароль"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
type Account = {
  mark: string,
  type: 'ldap' | 'local',
  login: string,
  password?: string
  isPassword?: boolean
}

const accounts = reactive<Account[]>([])

accounts.push({
  mark: '',
  type: 'local',
  login: '',
  password: '',
  isPassword: true
})
</script>

<style scoped lang="scss">
.accounts {

  &-header-table {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    div {
      width: 25%;
      padding: 0 10px;
    }
  }

  &-table {
    &-item {
      display: flex;
    }

    &-item > :nth-child(n) {
      width: 25%;
      padding: 0 10px;
    }
  }
}
</style>