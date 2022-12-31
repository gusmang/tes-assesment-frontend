import request_util from '../util/request'

export function apiFetchList(data) {
    return request_util({
        url:  '/admin/bank/getBank',
        method: 'POST',
        data: data
    })
}


//export default function apiFetchListMember()