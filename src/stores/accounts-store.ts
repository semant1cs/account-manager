import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

type Account = {
  mark: string,
  type: 'ldap' | 'local',
  login: string,
  password?: string
  isPassword?: boolean
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = reactive<Account[]>([])

  const removeAccount = (index: number) => {
    accounts.splice(index, 1)
  }

  const addAccount = () => {
    accounts.push({
      mark: '',
      type: 'local',
      login: '',
      password: '',
      isPassword: true
    })
  }

  const saveAccounts = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts))
  }

  const loadAccounts = () => {
    // accounts = JSON.parse(localStorage.getItem('accounts') ?? [])
  }

  return { accounts, addAccount, saveAccounts, removeAccount, loadAccounts }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountsStore, import.meta.hot));
}
