import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDarkStore = defineStore('dark', () => {
  const darkMode = ref(false)
  /**
   * @author ybl
   * @param {boolean} param 是否是dark模式
   * @returns none
   */
  const changeDarkMode = (param) => {
    if (param) {
      if (typeof param === 'boolean') {
        darkMode.value = param
        return
      } else {
        throw new Error('param must be boolean')
      }
    }
    darkMode.value = !darkMode.value
  }

  // 切换主题
  const toggleDarkMode = (param) => {
    // 获取html
    const html = document.querySelector("html");
    // 切换主题
    if (param) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  return {
    darkMode,
    // changeDarkMode,
    toggleDarkMode,
  }
})
