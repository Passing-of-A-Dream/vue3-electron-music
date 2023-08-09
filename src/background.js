const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const { exec } = require('child_process')

async function createWindow() {
    const win = await new BrowserWindow({
        width: 1000,
        height: 700,
        // 删除默认的菜单栏
        autoHideMenuBar: true,
        minHeight: 700,
        minWidth: 1000,
        icon: path.join(__dirname, 'favicon.ico'),

        // 配置窗口的WebPreferences选项，用于控制渲染进程的行为
        webPreferences: {
            // nodeIntegration: true, // 启用Node.js集成
            contextIsolation: true, // 禁用上下文隔离
            webSecurity: false, // 禁用web安全策略
            preload: path.join(__dirname, 'preload.js') // 指定预加载脚本
        }
    })

    // 检测系统主题变化
    nativeTheme.on('updated', () => {
        win.webContents.send('system-theme-changed', nativeTheme.shouldUseDarkColors)
    })
    // 检测窗口大小变化
    win.on('resize', () => {
        win.webContents.send('window-resized', win.getSize())
    })

    win.setMenu(null) // 禁用菜单栏

    // 根据命令行参数加载URL或本地文件
    if (process.argv[2]) {
        win.loadURL(process.argv[2])
        // 打开开发者工具
        win.webContents.openDevTools()
    } else {
        win.loadFile('index.html')
        // 禁止开发者工具
        win.webContents.closeDevTools()
        // 禁止调用菜单栏
        win.setMenu(null)
    }
}

// 等待Electron应用就绪后创建BrowserWindow窗口
app.whenReady().then(async () => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    // 更改系统主题
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = "light";
        } else {
            nativeTheme.themeSource = "dark";
        }
        return nativeTheme.shouldUseDarkColors;
    });
    // 获取当前系统主题
    ipcMain.handle("get-system-theme", () => {
        return nativeTheme.shouldUseDarkColors;
    })
    // 打开开发者工具
    ipcMain.handle("open-dev-tools", () => {
        BrowserWindow.getFocusedWindow().webContents.openDevTools()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
