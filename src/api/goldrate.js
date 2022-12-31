import request_util from '../util/request'
// import request_util_formdata from '../util/requestFormData'
import request_util_download from '../util/requestdownload'

export function apifetchGoldList(data) {
    return request_util({
        url: '/admin/goldrate/list',
        method: 'POST',
        data: data
    })
}

export function apiAddGoldRate(data) {
    return request_util({
        url: '/admin/goldrate/addGoldRate',
        method: 'POST',
        data: data
    })
}

export function apiHitDataGoldChart(data) {
    return request_util({
        url: '/admin/gold-chart',
        method: 'POST',
        data: data
    })
}

export function ApiExportTrxExcel(data){
    return request_util_download({
        url: '/admin/export/goldrate',
        method: 'POST',
        data: data
    })
}

// export function apiFetchNotifyApp(data) {
//     return request_util({
//         url: '/admin/webadmin/notifyApp',
//         method: 'POST',
//         data: data
//     })
// }

//export default function apiFetchListMember()