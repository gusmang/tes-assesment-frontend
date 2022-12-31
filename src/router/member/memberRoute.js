import MainComponent from '../../views/Main.vue'
import MemberList from '../../views/pages/member/mainList.vue'
import MemberListCash from '../../views/pages/member/mainListIdCash.vue'
import MemberRequestVerif from '../../views/pages/member/mainListRequestVerif.vue'
import SettingLog from '../../views/pages/member/mainLogMember.vue'
import EMoneySetting from '../../views/pages/member/mainListEmoney.vue'
import ThirdPartyVerify from '../../views/pages/member/mainListThirdVerify.vue'
import RequestNewCard from '../../views/pages/member/mainListRequestIdCash.vue'

export default [
    {
        path: '/panello/',
        name: 'Main Member',
        component: MainComponent,
        children: [
            {
                path: '/panello/member',
                name: 'Member List',
                component: MemberList
            },
            {
                path: '/panello/member',
                name: 'Member List',
                component: MemberList
            },
            {
                path: '/panello/memberIdCash',
                name: 'Member List IdCash',
                component: MemberListCash
            },
            {
                path: '/panello/MemberRequestVerif',
                name: 'Member Request Verify List',
                component: MemberRequestVerif
            },
            {
                path: '/panello/settingsActivitiesMember',
                name: 'Activity Log',
                component: SettingLog
            },
            {
                path: '/panello/VerifEmoney',
                name: 'Member Request E-Money',
                component: EMoneySetting
            },
            {
                path: '/panello/ThirdPartyVerify',
                name: 'Member Verify ThirdParty',
                component: ThirdPartyVerify
            },
            {
                path: '/panello/request-idcash',
                name: 'Request Kartu Baru IDCash',
                component: RequestNewCard
            }
        ]
    }
]