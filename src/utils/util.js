import { dayjs } from "element-plus"

/**
 * 格式化时间
 * @param {Date | number} time 时间，可以是Date对象，也可以是时间戳
 * @returns {string} 格式化后的时间
 */
function formatTime(time) {
    if (time > 3600) {
        return dayjs(time * 1000).format('HH:mm:ss')
    } else {
        return dayjs(time * 1000).format('mm:ss')
    }
}

export {
    formatTime,
}