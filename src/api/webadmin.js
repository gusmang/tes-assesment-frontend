import request_util from '../util/request'
import request_util_formdata from '../util/requestFormData'

export function apiFetchWebAdmin(data) {
    return request_util({
        url: '/admin/webadmin/getWebAdminMedia',
        method: 'POST',
        data: data
    })
}

export function apiFetchNotifyApp(data) {
    return request_util({
        url: '/admin/webadmin/notifyApp',
        method: 'POST',
        data: data
    })
}

export function apiPostAddNotify(data) {
    return request_util({
        url: '/admin/webadmin/addnotify',
        method: 'POST',
        data: data
    })
}

export function apiEditAddNotify(data) {
    return request_util({
        url: '/admin/webadmin/editAddNotify',
        method: 'POST',
        data: data
    })
}

export function apiUploadWebAdmin(data) {
    var formData = new FormData();
    var imagefile = data['file'];
    //console.log(imagefile);
    formData.append("files", imagefile);

    return request_util_formdata({
        url: '/admin/webadmin/postUploadMedia',
        method: 'POST',
        data: formData
    })
}

export function apiFetchWebPopUp(data) {
    return request_util_formdata({
        url: '/admin/webadmin/webPopUp',
        method: 'POST',
        data: data
    })
}

export function apiPostPopUpAdmin(data) {
    return request_util_formdata({
        url: '/admin/webadmin/postPopUp',
        method: 'POST',
        data: data
    })
}

export function apiEditPopUpAdmin(data) {
    return request_util_formdata({
        url: '/admin/webadmin/editPopUp',
        method: 'POST',
        data: data
    })
}


export function apiFetchWebPages(data) {
    return request_util_formdata({
        url: '/admin/webadmin/webPages',
        method: 'POST',
        data: data
    })
}

export function apiFetchSubmitPages(data) {
    return request_util_formdata({
        url: '/admin/webadmin/savePages',
        method: 'POST',
        data: data
    })
}

export function apiDeletePages(data) {
    return request_util_formdata({
        url: '/admin/webadmin/delPages',
        method: 'POST',
        data: data
    })
}




//export default function apiFetchListMember()