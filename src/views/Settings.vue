<script setup>

function handleClick() {
    window.electron.openDevTools();
}
function handleChangeTheme() {
    window.darkMode.toggle();
}
</script>

<template>
    <div class="settings">
        <h3>设置</h3>
        <main>
            主题设置
            <el-button @click="handleChangeTheme">主题</el-button>
            <el-button @click="handleClick">打开控制台</el-button>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0 20px;
}
</style>