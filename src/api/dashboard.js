import request_util from '../util/request'

export function apiGetDataTransaksi(data) {
    return request_util({
        url:  '/admin/dashboardTrx',
        method: 'POST',
        data: data
    })
}

export function apiDashboardStatistik(data) {
    return request_util({
        url:  '/admin/member/dashboardStatistik',
        method: 'POST',
        data: data
    })
}


//export default function apiFetchListMember()