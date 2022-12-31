import request_util from '../util/request'

export function apiGetAtmList(data) {
    return request_util({
        url: 'admin/atm_list_lokasi_mesin', 
        method: 'POST',
        data: data
    })
}

export function apiGetLokasiList(data) {
    return request_util({
        url: 'admin/add_lokasi_mesin', 
        method: 'POST',
        data: data
    })
}

export function addAtmLokasiNew(data) {
    return request_util({
        url: 'admin/atm_new_lokasi', 
        method: 'POST',
        data: data
    })
}

export function editAtmLokasiNew(data) {
    return request_util({
        url: 'admin/edit_new_lokasi', 
        method: 'POST',
        data: data
    })
}
