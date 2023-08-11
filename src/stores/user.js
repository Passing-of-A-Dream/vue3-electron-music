import { defineStore } from "pinia";

export const useMusicStore = defineStore('user', () => {
    const cookie = ref("");
    const isLogin = ref(false);
    const userInfo = ref({});

    return {
        cookie,
        isLogin,
        userInfo
    }
})