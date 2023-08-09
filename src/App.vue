<script setup>
import { RouterView, useRouter } from "vue-router";
import { useDarkStore } from "./stores/dark";
import MusicPlay from "@/components/MusicPlay.vue";
const router = useRouter();
// 获取全局主题变量
const darkStore = useDarkStore();
onBeforeMount(() => {
    document.title = "My音乐";
    // 获取系统主题
    window.electron.getSystemTheme().then(theme => {
        darkStore.toggleDarkMode(theme);
    });
});
onMounted(() => {});
// 监听主题变量
window.electron.onSystemThemeChanged((event, theme) => {
    darkStore.toggleDarkMode(theme);
});

const leftMenuSelected = ref("在线音乐");
// 左边功能栏功能
const leftMenu = [
    {
        name: "在线音乐",
        path: "/onlinemusic",
    },
    {
        name: "设置",
        path: "/settings",
    },
];

function handleMenuClick(item) {
    router.push(item.path);
    leftMenuSelected.value = item.name;
}
</script>

<template>
    <main class="content">
        <div class="left">
            <ul class="menu">
                <li
                    :class="leftMenuSelected === item.name ? 'li-selected' : ''"
                    v-for="item in leftMenu"
                    @click="handleMenuClick(item)"
                >
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="views">
                <router-view v-slot="{ Component }">
                    <KeepAlive>
                        <component :is="Component" />
                    </KeepAlive>
                </router-view>
            </div>
            <div class="play">
                <MusicPlay />
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    --left-width: 200px;

    .left {
        height: 100%;
        width: var(--left-width);
        padding: 0 20px;
        user-select: none;
        background-color: var(--el-fill-color-extra-light);
        .menu {
            height: auto;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px 0;
            gap: 8px;
            .li-selected {
                background-color: var(--el-color-primary-light-5);
            }
            li {
                height: 40px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                cursor: pointer;
                &:not(.li-selected):hover {
                    background-color: var(--el-color-primary-light-8);
                    // 背景透明度
                    opacity: 0.8;
                }
            }
        }
    }

    .right {
        height: 100%;
        width: calc(100% - var(--left-width));
        position: relative;
        --music-play-height: 60px;
        .views {
            height: 100%;
            padding-bottom: var(--music-play-height);
            width: 100%;
            overflow: hidden;
        }
        .play {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
    }
}
</style>
