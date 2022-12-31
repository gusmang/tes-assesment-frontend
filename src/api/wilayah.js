import request_util from '../util/request'

export function apiFetchList(data) {
    return request_util({
        url: '/admin/area/get',
        method: 'POST',
        data: data
    })
}

export function apiFetchAreaList(data) {
    return request_util({
        url: '/admin/area/getWilayah',
        method: 'POST',
        data: data
    })
}


//export default function apiFetchListMember()