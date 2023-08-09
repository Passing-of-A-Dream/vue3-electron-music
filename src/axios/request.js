import request from './index'

// #region 推荐页
// 轮播图
export const getBanner = () => {
    return request({
        url: '/banner'
    })
}

/**
 * 获取推荐歌单
 * @param {number} limit 取出数量 , 默认为 30
 * @returns promise
 */
export const getPersonalized = (limit) => {
    return request({
        url: '/personalized' + (limit ? `?limit=${limit}` : '')
    })
}

/**
 * 获取推荐新音乐
 * @param {number} limit 取出数量 , 默认为 10 (不支持 offset)
 * @returns promise
 */
export const getPersonalizedNewsong = (limit) => {
    return request({
        url: '/personalized/newsong' + (limit ? `?limit=${limit}` : '')
    })
}

// #endregion

// #region 歌曲播放

/**
 * 获取歌曲详情
 * @param {{id: number, level: string}} params 歌曲id
 * @returns promise
 */
export const getSongUrl = (params) => {
    return request({
        url: '/song/url/v1',
        params: params
    })
}

// #endregion