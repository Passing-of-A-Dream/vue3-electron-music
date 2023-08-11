const winSize = reactive({
    width: 1000,
    height: 600,
})

window.electron.onWindowResized((size) => {
    winSize.width = size[0]
    winSize.height = size[1]
})

export { winSize }