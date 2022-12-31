import request_util from '../util/request'
//tes

export function apiFetchListMember(data) {
    return request_util({
        url: '/api/getdata',
        method: 'POST',
        data: data
    })
}
export function apiEditProfiles(data) {
    return request_util({
        url: '/admin/member/totals',
        method: 'POST',
        data: data
    })
}

export function apiUpdateProfiles(data) {
    return request_util({
        url: '/api/updateprofil',
        method: 'POST',
        data: data
    })
}

export function apiRegInstruktur(data) {
    return request_util({
        url: '/api/register_instruktur',
        method: 'POST',
        data: data
    })
}

export function apiUpdateInstruktur(data) {
    return request_util({
        url: '/api/update_instruktur',
        method: 'POST',
        data: data
    })
}

export function apiFetchListRank(data) {
    return request_util({
        url: '/admin/member/rank',
        method: 'POST',
        data: data
    })
}

export function apiGetProfiles() {
    return request_util({
        url: '/api/getprofil',
        method: 'POST'
    })
}


//export default function apiFetchListMember()