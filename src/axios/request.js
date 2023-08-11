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
 * 获取歌单详情
 * @param {{id:number,limit?:number,offset?:number | 0}} params
 * {
 *  id: 歌单id,
 *  limit:限制获取歌曲的数量，默认值为当前歌单的歌曲数量,
 *  offset: 偏移数量，用于分页，默认为 0
 * }
 * @returns promise
 */
export const getPlayList = (params) => {
    return request({
        url: '/playlist/track/all',
        params: params
    })
}

/**
 * 获取歌曲url
 * @param {{id: number, level: string}} params 歌曲id
 * @returns promise
 */
export const getSongUrl = (params) => {
    return request({
        url: '/song/url/v1',
        params: params
    })
}

/**
 * 获取歌曲详情
 * @param {string} ids 歌曲id,多个用逗号隔开
 * @returns promise
 */
export const getSongDetail = (ids) => {
    return request({
        url: '/song/detail',
        params: {
            ids
        }
    })
}

// #endregion