import request_util from '../util/request'

export function apiFetchKategori(data) {
    return request_util({
        url: '/api/get_kategori',
        method: 'POST',
        data: data
    })
}

export function apiFetchSubKategori(data) {
    return request_util({
        url: '/api/get_sub_kategori/'+data.id_kategori,
        method: 'POST',
        data: data
    })
}

//export default function apiFetchListMember()