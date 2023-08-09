import { defineStore } from "pinia";

export const useMusicStore = defineStore('music', () => {
    const musicList = ref([]);
    const musicLevel = ref("standard");

    return {
        musicList,
        musicLevel
    }
})