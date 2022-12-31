import request_util from '../util/request'

export function apifetchKursusList(data) {
    return request_util({
        url: 'api/get_list_kursus', 
        method: 'GET',
        data: data
    })
}