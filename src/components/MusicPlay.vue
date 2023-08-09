<script setup>
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
import { getSongUrl } from "@/axios/request";
const musicStore = storeToRefs(useMusicStore());

const playList = ref([]); // 播放列表
const audioRef = ref(null); // audio dom

watch(
    () => musicStore.musicList.value,
    newVal => {
        getSongUrl({
            id: newVal[0],
            level: musicStore.musicLevel.value,
        }).then(res => {
            console.log('%c [ res ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', res)
            playList.value = res.data[0].url;
        });
    },
    { deep: true },
);

onMounted(() => {
    // 更改audioRef的音量
    audioRef.value.volume = 0.3;
});
</script>

<template>
    <div class="music-play">
        <audio controls autoplay :src="playList" ref="audioRef"></audio>
    </div>
</template>

<style lang="scss" scoped>
.music-play {
    width: 100%;
    height: var(--music-play-height);
    background-color: rgb(27, 146, 250);
    audio {
        width: 100%;
        height: 100%;
    }
}
</style>
