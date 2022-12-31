import request_util from '../util/request'

export function apiFetchAffiliate(data) {
    return request_util({
        url: 'admin/affiliate/listuser-affiliate', 
        method: 'POST',
        data: data
    })
}

export function apiPostAffiliate(data) {
    return request_util({
        url: 'admin/affiliate/post-affiliate', 
        method: 'POST',
        data: data
    })
}

export function apiRewardPostAffiliate(data) {
    return request_util({
        url: 'admin/affiliate/listreward-affiliate', 
        method: 'POST',
        data: data
    })
}

export function AddRewardPostAffiliate(data) {
    return request_util({
        url: 'admin/affiliate/addReward', 
        method: 'POST',
        data: data
    })
}

export function apiTransaksiPostAffiliate(data) {
    return request_util({
        url: 'admin/affiliate/listTransAffiliate', 
        method: 'POST',
        data: data
    })
}

export function apiPromoListAffiliate(data) {
    return request_util({
        url: 'admin/affiliate/listPromoAffiliate', 
        method: 'POST',
        data: data
    })
}

export function AddPromoPostAffiliate(data) {
    return request_util({
        url: 'admin/affiliate/addListPromoAffiliate', 
        method: 'POST',
        data: data
    })
}