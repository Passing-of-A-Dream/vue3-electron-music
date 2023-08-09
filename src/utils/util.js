/**
 * @author ybl
 * @param {{
 *  title: string
 *  messageBody: {
 *     body: string
 *     icon: string
 *     image: string
 *  }
 *  showTime: number
 *  onClick: () => void
 *  onError: () => void
 *  onClose: () => void
 * }} param0 title: 标题, messageBody: 消息体, showTime: 显示时间, onClick: 点击事件, onError: 错误事件, onClose: 关闭事件
 * @returns none
 */
const notification = ({
    title = 'Notification',
    messageBody = { body: 'This is a notification' },
    showTime = 2000,
    onClick,
    onError,
    onClose,
}) => {
    const notification = new Notification(title, messageBody)
    notification.onshow = () => {
        setTimeout(() => {
            notification.close()
        }, showTime)
    }
    notification.onclick = onClick
    notification.onerror = onError
    notification.onclose = onClose
}

export {
    notification,
}