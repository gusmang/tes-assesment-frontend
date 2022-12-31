import request_util from '../util/request'

export function ApiRefferalList(data) {
    return request_util({
        url: '/admin/corporate/referral',
        method: 'POST',
        data: data
    })
}

export function ApiTrxRefferalList(data) {
    return request_util({
        url: '/admin/corporate/trx-referral',
        method: 'POST',
        data: data
    })
}

export function ApiAddCorporate(data) {
    return request_util({
        url: '/admin/corporate/register',
        method: 'POST',
        data: data
    })
}


//export default function apiFetchListMember()