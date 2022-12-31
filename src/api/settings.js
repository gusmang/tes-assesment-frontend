import request_util from '../util/request'


export function apiDenomList(data) {
    return request_util({
        url: '/admin/settings/listDenom',
        method: 'POST',
        data: data
    })
}

export function apiAddDenomList(data) {
    return request_util({
        url: '/admin/settings/saveDenom',
        method: 'POST',
        data: data
    })
}

export function apiEditDenomList(data) {
    return request_util({
        url: '/admin/settings/editDenom',
        method: 'POST',
        data: data
    })
}

export function apiDeleteDenomList(data) {
    return request_util({
        url: '/admin/settings/deleteDenom',
        method: 'POST',
        data: data
    })
}

export function apiFetchEmailTemplate(data) {
    return request_util({
        url: '/admin/settings/getTemplate',
        method: 'POST',
        data: data
    })
}

export function apiFetchAdminModule(data) {
    return request_util({
        url: '/admin/settings/getModule',
        method: 'POST',
        data: data
    })
}

export function apiAddAdminModule(data) {
    return request_util({
        url: '/admin/settings/saveModule',
        method: 'POST',
        data: data
    })
}

export function apiFetchTrxModule(data) {
    return request_util({
        url: '/admin/settings/getTransactionLog',
        method: 'POST',
        data: data
    })
}

export function apiEditAdminModule(data) {
    return request_util({
        url: '/admin/settings/editModule',
        method: 'POST',
        data: data
    })
}

export function openMarketApiData(data) {
    return request_util({
        url: '/admin/gouttes-req',
        method: 'POST',
        data: data
    })
}

export function apiFetchCheckData(data) {
    return request_util({
        url: '/admin/settings/getCheckData',
        method: 'POST',
        data: data
    })
}

export function apiPostEmailTemplate(data) {
    return request_util({
        url: '/admin/settings/postTemplate',
        method: 'POST',
        data: data
    })
}

export function apiPostDeleteEmailTemplate(data) {
    return request_util({
        url: '/admin/settings/deleteTemplate',
        method: 'POST',
        data: data
    })
}

export function apiAddEmailTemplate(data){
    return request_util({
        url: '/admin/settings/addTemplate',
        method: 'POST',
        data: data
    })
}

export function apiFetchCustomVar(data){
    return request_util({
        url: '/admin/settings/get_customvar',
        method: 'POST',
        data: data
    })
}

export function apiAddSubmitVar(data){
    return request_util({
        url: '/admin/settings/addSubmitVar',
        method: 'POST',
        data: data
    })
}

export function apiEditSubmitVar(data){
    return request_util({
        url: '/admin/settings/editSubmitVar',
        method: 'POST',
        data: data
    })
}

export function apiDeleteSubmitVar(data){
    return request_util({
        url: '/admin/settings/deleteSubmitVar',
        method: 'POST',
        data: data
    })
}

export function apiFetchOpenChannel(data){
    return request_util({
        url: '/admin/settings/openChannel',
        method: 'POST',
        data: data
    })
}

export function editChannelStatus(data){
    return request_util({
        url: '/admin/settings/openchfitur',
        method: 'POST',
        data: data
    })
}

export function editChannelBayar(data){
    return request_util({
        url: '/admin/settings/postOpenChannel',
        method: 'POST',
        data: data
    })
}

export function apiAddSettingAdmin(data){
    return request_util({
        url: '/admin/settings/AddSettingAdmin',
        method: 'POST',
        data: data
    })
}

//export default function apiFetchListMember()