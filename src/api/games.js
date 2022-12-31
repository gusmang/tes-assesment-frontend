import request_util from '../util/request'

export function apiFetchList(data) {
    return request_util({
        url:  '/admin/games/listreward',
        method: 'POST',
        data: data
    })
}

export function apiFetchScore(data) {
    return request_util({
        url:  '/admin/games/listscore',
        method: 'POST',
        data: data
    })
}

export function apiGiveRewards(data) {
    return request_util({
        url:  '/admin/games/givereward',
        method: 'POST',
        data: data
    })
}

//export default function apiFetchListMember()