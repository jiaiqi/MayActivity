import {
  defineStore
} from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      count: 0,
      token:'',
    };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    setTicket(ticket){
      this.token = token
    },
    increment() {
      this.count++;
    },
  },
});
