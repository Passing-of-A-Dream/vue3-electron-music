import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWinSizeStore = defineStore('winSize', () => {
    const winSize = ref({
        width: 1000,
        height: 700
    })

    window.electron.onWindowResized((event, size) => {
        winSize.value.width = size[0]
        winSize.value.height = size[1]
    })
    return {
        winSize,
    }
})