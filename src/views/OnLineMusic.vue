<script setup>
import {
    getBanner,
    getPersonalized,
    getPersonalizedNewsong,
} from "@/axios/request";
import { useWinSizeStore } from "@/stores/winSize";
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
const winSizeStore = storeToRefs(useWinSizeStore());
const musicStore = storeToRefs(useMusicStore());
const bannersHeight = ref("200px"); // 轮播图高度
// 监听窗口大小变化
watch(
    () => winSizeStore.winSize.value,
    newVal => {
        if (newVal.width > 1400) {
            bannersHeight.value = "300px";
        } else {
            bannersHeight.value = "200px";
        }
    },
    { immediate: true, deep: true },
);
const banners = ref([]); // 轮播图
const personalized = ref([]); // 推荐歌单
const newSong = ref([]); // 推荐音乐
// 获取轮播图
getBanner().then(res => {
    banners.value = res.banners;
});
// 获取推荐歌单
getPersonalized(10).then(res => {
    personalized.value = res.result;
});
// 获取推荐音乐
getPersonalizedNewsong().then(res => {
    newSong.value = res.result;
});

function playNewMusic(item) {
    musicStore.musicList.value = [];
    musicStore.musicList.value.push(item.id);
}
</script>

<template>
    <div class="onLineMusic">
        <header class="header">
            <div class="banners">
                <el-carousel
                    type="card"
                    :interval="5000"
                    :height="bannersHeight"
                    arrow="never"
                    indicator-position="none"
                >
                    <el-carousel-item
                        v-for="item in banners"
                        :key="item.encodeId"
                        style="border-radius: 10px"
                    >
                        <img :src="item.imageUrl" class="banner_image" alt="" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </header>
        <main class="main">
            <div class="personalize">
                <h3>您的专属歌单</h3>
                <div class="personalized-container">
                    <div
                        class="item"
                        v-for="item in personalized"
                        :key="item.id"
                    >
                        <img :src="item.picUrl" :alt="item.name" />
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
            <div class="new-song">
                <h3>推荐音乐</h3>
                <div class="container">
                    <div class="item" v-for="item in newSong" :key="item.id" @click="playNewMusic(item)">
                        <img :src="item.picUrl" :alt="item.name" />
                        <span>{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" setup>
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
// 滚动条滑块
::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
}
// 滚动条轨道
::-webkit-scrollbar-track {
    display: none;
}
.onLineMusic {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0 20px;
    overflow-y: scroll;

    .header {
        width: 100%;
        display: flex;
        justify-content: center;
        .banners {
            max-width: 1400px;
            width: auto;
            height: v-bind(bannersHeight);
            overflow: hidden;
            aspect-ratio: 4/1;

            .banner_image {
                width: 100%;
                height: 100%;
            }
        }
    }

    .main {
        width: 100%;
        margin-top: 20px;
        --item-padding: 10px;
        .personalize {
            width: 100%;
            .personalized-container {
                width: 100%;
                display: grid;
                padding: var(--item-padding);
                grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
                gap: 20px;
                .item {
                    height: auto;
                    width: 100%;
                    aspect-ratio: 1/1;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    gap: 5px;
                    &:hover img {
                        transform: scale(1.1) translateY(-5px);
                        box-shadow: 1px 1px 10px #ccc;
                    }
                    img {
                        height: calc(100% - 10px);
                        aspect-ratio: 1/1;
                        border-radius: var(--item-padding);
                        transition: transform 0.3s ease-in-out,
                            box-shadow 0.3s ease-in-out;
                    }
                    span {
                        display: block;
                        width: 100%;
                        font-size: 12px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }

        .new-song {
            margin-top: 10px;
            width: 100%;
            .container {
                padding: var(--item-padding);
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: calc(var(--item-padding));
                .item {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    border-radius: calc(var(--item-padding) / 2);
                    &:hover {
                        // 背景渐变色
                        background-image: linear-gradient(
                            to right,
                            var(--el-color-white),
                            var(--el-color-primary-light-9),
                        );
                        span {
                            color: var(--el-color-primary-light-3);
                        }
                    }
                    img {
                        width: 50px;
                        aspect-ratio: 1/1;
                        margin-right: calc(var(--item-padding) / 2);
                        border-radius: calc(var(--item-padding) / 2);
                    }
                }
            }
        }
    }
}
</style>
