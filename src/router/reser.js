import Vue from 'vue'



import ForgotEmail from '@/views/Auth/ForgotEmail.vue'
import ForgotPassword from '@/views/Auth/ForgotPassword'
import ResetPassword from '@/views/Auth/ResetPassword'


import AddTeacher from '@/views/Teacher/AddTeacher'
import Misc from '@/views/Misc/Index'
import Session from '@/views/Session/Index'
import AddSession from '@/views/Session/AddSession'



import NoLunch from '@/views/Lunch/Index'
import EditLunch from '@/views/Lunch/EditLunch'
import Order from '@/views/Order/Index'
import EditOrder from '@/views/Order/EditOrder'
import InitOrder from '@/views/Order/InitOrder'
import RefundOrder from '@/views/Order/RefundOrder'
import AddItem from '@/views/Order/AddItem'

import Invite from '@/views/Staff/Invite'
import AcceptInvite from '@/views/Staff/AcceptInvite'

import EditMember from '@/views/Member/EditMember'
import Config from '@/views/Config/Index'




Vue.use(Router)

export default new Router({

  linkExactActiveClass: 'active',
  routes: [



    {
      path: '/teacher/add-teacher',
      name: 'AddTeacher',
      component: AddTeacher
    },
    {
      path: '/teacher/edit/:id',
      name: 'AddTeacher',
      component: AddTeacher
    },
    {
      path: '/school-and-grade',
      name: 'Misc',
      component: Misc
    },
    {
      path: '/sessions',
      name: 'Session',
      component: Session
    },
    {
      path: '/session/add-session',
      name: 'AddSession',
      component: AddSession
    },


    {
      path: '/no-lunch',
      name: 'NoLunch',
      component: NoLunch
    },
    {
      path: '/lunch/edit-lunch',
      name: 'EditLunch',
      component: EditLunch
    },

    {
      path: '/order/2017/a',
      name: 'InitOrder',
      component: InitOrder
    },
    {
      path: '/order/desc/b',
      name: 'RefundOrder',
      component: RefundOrder
    },
    {
      path: '/order/amount/c',
      name: 'AddItem',
      component: AddItem
    },

    {
      path: '/staff/invite',
      name: 'Invite',
      component: Invite
    },
    {
      path: '/staff/invite/accept',
      name: 'AcceptInvite',
      component: AcceptInvite
    },

    {
      path: '/member/edit',
      name: 'EditMember',
      component: EditMember
    },

    

  ]
})
