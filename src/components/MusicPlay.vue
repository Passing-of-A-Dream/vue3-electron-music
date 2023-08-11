<script setup>
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
import { getSongUrl, getSongDetail } from "@/axios/request";
import { formatTime } from "@/utils/util";
import icon from "@/assets/icon.vue";
import musicplaceholder from "@/assets/musicplaceholder.png";
const musicStore = storeToRefs(useMusicStore());

const playList = ref([]); // 播放列表
const playIndex = ref(0); // 当前播放索引
const playDetail = ref([]); // 当前播放详情
const audioRef = ref(null); // audio dom
const currentTime = ref(0); // 当前播放时间
const duration = ref(0); // 音频总时长
const progress = ref(0); // 进度条
const isChange = ref(false); // 是否在拖动进度条
const muted = ref(false); // 是否静音
const isPlay = ref(false); // 是否正在播放

watch(
    () => musicStore.musicList.value,
    newVal => {
        playList.value = [];
        playDetail.value = [];
        playIndex.value = 0;
        getPlayMusic(newVal);
    },
    { deep: true },
);

function getPlayMusic(param) {
    getSongUrl({
        id: param.toString(),
        level: musicStore.musicLevel.value,
    }).then(res => {
        res.data.forEach(item => {
            playList.value.push(item.url);
        });
        duration.value = res.data[0].time / 1000;
    });
    getSongDetail(param.toString()).then(res => {
        res.songs.forEach(item => {
            let obj = {
                name: item.name, // 歌曲名
                singer: item.ar[0].name, // 歌手
                picUrl: item.al.picUrl, // 歌曲图片
            };
            playDetail.value.push(obj);
        });
    });
}

onMounted(() => {
    // 更改audioRef的音量
    audioRef.value.volume = 0.3;
    // getPlayMusic(2071198696);
});

// 监听播放时间
function handleTimeUpDate() {
    if (isChange.value) return;
    currentTime.value = audioRef.value.currentTime;
    progress.value = Number(
        ((currentTime.value / duration.value) * 100).toFixed(3),
    );
}
// 更改进度条
function handleChangeProgress(val) {
    if (duration.value == 0) return;
    isChange.value = true;
    audioRef.value.currentTime = (val / 100) * duration.value;
    isChange.value = false;
}
// 暂停
function handlePause() {
    if (audioRef.value.paused) {
        audioRef.value.play();
    } else {
        audioRef.value.pause();
    }
}
// 播放结束
function handlePlayEnd() {
    if (playIndex.value < playList.value.length - 1) {
        playIndex.value++;
    } else {
        playIndex.value = 0;
    }
}
// 切换歌曲
function changePlay(param) {
    if (param === "right") {
        if (playIndex.value < playList.value.length - 1) {
            playIndex.value++;
        }
    } else {
        if (playIndex.value > 0) {
            playIndex.value--;
        } else {
            playIndex.value = playList.value.length - 1;
        }
    }
}
</script>

<template>
    <div class="music-play">
        <div class="music-progress">
            <el-slider
                v-model="progress"
                size="small"
                :show-tooltip="false"
                :step="0.1"
                @change="handleChangeProgress"
                @mousedown.native="isChange = true"
                @mouseup.native="isChange = false"
            />
        </div>
        <div class="music-info">
            <div class="info-left">
                <el-image
                    class="music-image"
                    :src="playDetail[playIndex]?.picUrl"
                >
                    <template #placeholder>
                        <el-image :src="musicplaceholder"></el-image>
                    </template>
                    <template #error>
                        <el-image :src="musicplaceholder"></el-image>
                    </template>
                </el-image>
                <div class="detail-info">
                    <div>
                        <el-text style="text-align: left" truncated>
                            {{ playDetail[playIndex]?.name || "歌曲名称" }}
                            <el-text style="opacity: 0.8">
                                &nbsp;-&nbsp;
                                {{ playDetail[playIndex]?.singer || "歌手" }}
                            </el-text>
                        </el-text>
                    </div>
                    <div class="icons">
                        <icon name="icon-xiai" />
                    </div>
                </div>
            </div>
            <div class="info-content">
                <div class="action-tab">
                    <div class="left-icon" @click="changePlay('left')">
                        <icon class="action-icon" name="icon-kuaitui" />
                    </div>
                    <div class="icon-container" @click="handlePause">
                        <icon
                            v-show="isPlay"
                            class="action-icon icon-play"
                            name="icon-bofang"
                        />
                        <icon
                            v-show="!isPlay"
                            class="action-icon icon-play"
                            name="icon-zanting"
                        />
                    </div>
                    <div class="right-icon" @click="changePlay('right')">
                        <icon class="action-icon" name="icon-kuaijin" />
                    </div>
                </div>
            </div>
            <div class="info-right">
                <div class="music-time">
                    <span>{{ formatTime(currentTime) }}</span>
                    <span>/</span>
                    <span>{{ formatTime(duration) }}</span>
                </div>
            </div>
        </div>
        <audio
            autoplay
            :src="playList[playIndex]"
            @timeupdate="handleTimeUpDate"
            @ended="handlePlayEnd"
            :muted="muted"
            @playing="isPlay = true"
            @pause="isPlay = false"
            ref="audioRef"
        ></audio>
    </div>
</template>

<style lang="scss" scoped>
.music-play {
    --progress-btn-width: 10px;
    --progress-height: 8px;
    width: 100%;
    height: var(--music-play-height);
    position: relative;
    padding-top: var(--progress-height);
    .music-progress {
        position: absolute;
        width: calc(100% - var(--progress-btn-width));
        height: var(--progress-height);
        top: 0;
        left: calc(var(--progress-btn-width) / 2);
    }
    .music-info {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 40% 40% 20%;
        justify-items: start;
        grid-template-rows: 100%;
        align-items: center;
        padding: var(--progress-height) 40px;
        .info-left,
        .info-content,
        .info-right {
            height: 100%;
            display: flex;
            align-items: center;
        }
        .info-left {
            width: 100%;
            .music-image {
                height: 100%;
                aspect-ratio: 1/1;
                border-radius: 5px;
                margin-right: 10px;
            }
            .detail-info {
                width: 60%;
                // font-size: 13px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .icons {
                    .icon {
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
            }
        }
        .info-content {
            justify-content: center;
            .action-tab {
                display: flex;
                align-items: center;
                gap: 14px;
                .left-icon,
                .right-icon {
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                }
                .icon-container {
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                }
                .action-icon {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }
}
:deep(.el-slider) {
    height: 8px;
    --el-slider-button-wrapper-size: 10px;
    --el-slider-height: 3px;
    --el-slider-button-wrapper-offset: -4px;
}
:deep(.el-slider:hover .el-slider__button-wrapper) {
    opacity: 1;
}
:deep(.el-slider__button) {
    width: var(--progress-btn-width);
    height: var(--progress-btn-width);
}
:deep(.el-slider__button-wrapper) {
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
}
:deep(.el-slider__button .hover),
:deep(.el-slider__button .dragging),
:deep(.el-slider__button):hover,
:deep(.el-slider__button-wrapper .hover),
:deep(.el-slider__button-wrapper .dragging),
:deep(.el-slider__button-wrapper):hover {
    opacity: 1;
    cursor: pointer;
}
:deep(.el-slider__button) {
    background-color: var(--el-slider-main-bg-color);
    transform: translateY(-70%);
}
</style>
