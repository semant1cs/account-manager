import { defineStore } from 'pinia';
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
    console.log(accounts)
    const preparedAccounts = accounts.map((account) => {
      const preparedMark = account.mark.split(';')
      if (account.type === 'local') {
        return { ...account, mark: preparedMark }
      } else {
        return { ...account, password: null, mark: preparedMark }
      }
    })
    localStorage.setItem('accounts', JSON.stringify(preparedAccounts))
  }

  const loadAccounts = () => {
    const storageAccounts = localStorage.getItem('accounts')

    if (storageAccounts) {
      const parsedAccounts = JSON.parse(storageAccounts)

      parsedAccounts?.forEach((account: Account) => {
        const preparedMark = (account.mark as unknown as string[]).join(';')
        accounts.push({ ...account, mark: preparedMark })
      });
    }
  }

  return { accounts, addAccount, saveAccounts, removeAccount, loadAccounts }
})
