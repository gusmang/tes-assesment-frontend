import request_util from '../util/request'
import request_util_download from '../util/requestdownload'

export function apiFetchTransactionMember(data) {
    return request_util({
        url: '/admin/trx/list',
        method: 'POST',
        data: data
    })
}

export function apiManualTrx(data) {
    return request_util({
        url: '/admin/trx/trxManual',
        method: 'POST',
        data: data
    })
}

export function apiVerifyTransaction(data) {
    return request_util({
        url: '/admin/trx/VerifyList',
        method: 'POST',
        data: data
    })
}

export function apiVerifyTrxMemberBan(data) {
    return request_util({
        url: '/admin/trx/trx_ban',
        method: 'POST',
        data: data
    })
}

export function apiListTrxListSettlement(data) {
    return request_util({
        url: '/admin/trx/listTrxSettlement',
        method: 'POST',
        data: data
    })
}

export function apiVerifyTrxMemberSuccess(data) {
    return request_util({
        url: '/admin/trx/trx_member_success',
        method: 'POST',
        data: data
    })
}

export function apiListTrxListHisGold(data){
    return request_util({
        url: '/admin/trx/listTrxEmas',
        method: 'POST',
        data: data
    })
}

export function apiPengirimanAwb(data){
    return request_util({
        url: '/admin/trx/getAwb',
        method: 'POST',
        data: data
    })
}

export function apiListTrxListConnGold(data){
    return request_util({
        url: '/admin/trx/getCounter',
        method: 'POST',
        data: data
    })
}

export function apiListTrxListRefundGold(data){
    return request_util({
        url: '/admin/trx/refundCetak',
        method: 'POST',
        data: data
    })
}

export function apiListTrxListFinalConnGold(data) {
    return request_util({
        url: '/admin/trx/getConfirm',
        method: 'POST',
        data: data
    })
}

export function apiListPickupAwb(data) {
    return request_util({
        url: '/admin/trx/pickupAwb',
        method: 'POST',
        data: data
    })
}

export function apiListTrxListStockGold(data) {
    return request_util({
        url: '/admin/trx/stockemas',
        method: 'POST',
        data: data
    })
}

export function apiPostStockGold(data) {
    return request_util({
        url: '/admin/trx/postStock',
        method: 'POST',
        data: data
    })
}

export function apiPostAtmStockGold(data) {
    return request_util({
        url: '/admin/trx/postAtmStock',
        method: 'POST',
        data: data
    })
}

export function apiListTrxListAtmGold(data) {
    return request_util({
        url: '/admin/trx/listTrxAtmEmas',
        method: 'POST',
        data: data
    })
}

export function apiOfflineCounter(data) {
    return request_util({
        url: '/admin/trx/offline-counter',
        method: 'POST',
        data: data
    })
}

export function apiOfflineJadwalCounter(data) {
    return request_util({
        url: '/admin/trx/detailcounter',
        method: 'POST',
        data: data
    })
}

export function addMemberPostCounter(data) {
    return request_util({
        url: '/admin/trx/addCounter',
        method: 'POST',
        data: data
    })
}

export function postCounterJadwal(data){
    return request_util({
        url: '/admin/trx/addschCounter',
        method: 'POST',
        data: data
    })
}

export function editMemberPostCounter(data){
    return request_util({
        url: '/admin/trx/editCounter',
        method: 'POST',
        data: data
    })
}

export function deleteCounterJadwal(data){
    return request_util({
        url: '/admin/trx/delschCounter',
        method: 'POST',
        data: data
    })
}

export function ApiFetchStokEmas(data){
    return request_util({
        url: '/admin/trx/setorEmas',
        method: 'POST',
        data: data
    })
}

export function ApiAddSetorEmas(data){
    return request_util({
        url: '/admin/trx/addSetorEmas',
        method: 'POST',
        data: data
    })
}

export function ApiExportTrxExcel(data){
    return request_util_download({
        url: '/admin/export/trx',
        method: 'POST',
        data: data
    })
}

export function apiPostTrxManual(data){
    return request_util({
        url: '/admin/trx/trxManualTrans',
        method: 'POST',
        data: data
    })
}

export function ApiExportNewTrxExcel(data){
    return request_util_download({
        url: '/admin/export/ambilemas',
        method: 'POST',
        data: data
    })
}

export function apiHitDataTransChart(data) {
    return request_util({
        url:  '/admin/dashboardTransaksi',
        method: 'POST',
        data: data
    })
}


export function apiListTrxNewGoldAtm(data) {
    return request_util({
        url: '/admin/trx/listTrxGoldAtm',
        method: 'POST',
        data: data
    })
}


export function apiGetDataMembers(data) {
    return request_util({
        url:  '/admin/dashboardMember',
        method: 'POST',
        data: data
    })
}

export function apiHitDataMemberChart(data) {
    return request_util({
        url:  '/admin/dashboardMember',
        method: 'POST',
        data: data
    })
}

export function apiGetDataMemberChart(data) {
    return request_util({
        url:  '/admin/dashboardMember',
        method: 'POST',
        data: data
    })
}

export function apiUploadICDX(data) {
    return request_util({
        url:  '/admin/trx/uploadICDX',
        method: 'POST',
        data: data
    })
}

export function exportMemberTrx(data) {
    return request_util_download({
        url:  '/admin/export/exportMemberTrx',
        method: 'POST',
        data: data
    })
}