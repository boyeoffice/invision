import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard/Index'
import Login from '@/views/Auth/Login'
import { store } from '../Vuex/store'
import Sessions from '@/views/Session/Index'
import SessionForm from '@/views/Session/Form'
import Lunch from '@/views/Lunch/Index'
import LunchForm from '@/views/Lunch/Form'
import Vendors from '@/views/Vendor/Index'
import VendorForm from '@/views/Vendor/Form'
import Menu from '@/views/Menu/Index'
import FormMenu from '@/views/Menu/Form'
import Student from '@/views/Student/Index'
import StudentForm from '@/views/Student/Form'
import Teacher from '@/views/Teacher/Index'
import TeacherForm from '@/views/Teacher/Form'
import Misc from '@/views/Misc/Index'
import Order from '@/views/Order/Index'
import Staff from '@/views/Staff/Index'
import StaffForm from '@/views/Staff/Form'
import Invite from '@/views/Staff/Invite'
import Member from '@/views/Member/Index'
import MemberForm from '@/views/Member/Form'
import Config from '@/views/Config/Index'
import Profile from '@/views/User/Profile'
import Notify from '@/views/Alerts/Notify'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
  {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: requireVisitors
    },
    {
      path: '/staff/lunch/sessions',
      component: Sessions,
      name: 'Sessions',
      beforeEnter: requireAuth
    },
    {
      path: '/staff/lunch/sessions/add',
      component: SessionForm,
      name: 'SessionFormAdd',
      beforeEnter: requireAuth
    },
    {
      path: '/staff/lunch/sessions/:id',
      component: SessionForm,
      name: 'SessionFormEdit',
      beforeEnter: requireAuth,
      meta: {mode: 'edit'}
    },
    {
      path: '/staff/lunch/no-lunch-days',
      name: 'Lunch',
      component: Lunch,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/lunch/nolunchdays/add',
      component: LunchForm,
      name: 'LunchFormAdd',
      beforeEnter: requireAuth,
    },
    {
      path: '/staff/lunch/nolunchdays/:id/',
      component: LunchForm,
      name: 'LunchFormEdit',
      beforeEnter: requireAuth,
      meta: {mode: 'edit'}
    },
    {
      path: '/staff/lunch/vendors',
      name: 'Vendors',
      component: Vendors,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/lunch/vendors/add',
      name: 'AddVendor',
      component: VendorForm,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/lunch/vendors/:id',
      name: 'EditVendor',
      component: VendorForm,
      beforeEnter:requireAuth,
      meta: {mode: 'edit'}
    },
     {
      path: '/staff/lunch/items',
      name: 'Menu',
      component: Menu,
      beforeEnter: requireAuth,
    },
    {
      path: '/staff/lunch/items/add',
      name: 'AddMenu',
      component: FormMenu,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/lunch/items/:id',
      name: 'EditMenu',
      component: FormMenu,
      beforeEnter: requireAuth,
       meta: {mode: 'edit'}
    },
    {
    	path: '/staff/students',
    	name: 'Student',
    	component: Student,
      beforeEnter: requireAuth
    },
    {
    	path: '/staff/student/:id',
    	name: 'StudentFormEdit',
    	component: StudentForm,
      beforeEnter: requireAuth,
      meta: {mode: 'edit'}
    },
    {
    	path: '/staff/teachers',
    	name: 'Teacher',
    	component: Teacher,
      beforeEnter: requireAuth
    },
    {
    	path: '/staff/teacher/add',
    	name: 'AddTeacher',
    	component: TeacherForm,
      beforeEnter: requireAuth
    },
    {
    	path: '/staff/teacher/:id',
    	name: 'EditTeacher',
    	component: TeacherForm,
      beforeEnter: requireAuth,
      meta: {mode: 'edit'}
    },
    {
      path: '/staff/misc-metadata',
      name: 'Misc',
      component: Misc,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/lunch/orders',
      name: 'Order',
      component: Order,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/Staffs',
      name: 'Staff',
      component: Staff,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/staff/:id',
      name: 'StaffForm',
      component: StaffForm,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/invite-staff',
      name: 'Invite',
      component: Invite,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/members',
      name: 'Member',
      component: Member,
      beforeEnter: requireAuth
    },
    {
      path: '/staff/member/:id',
      name: 'MemberForm',
      component: MemberForm,
      beforeEnter: requireAuth
    },
    {
      path: '/settings',
      name: 'Config',
      component: Config,
      beforeEnter: requireAuth
    },
    {
      path: '/user/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: requireAuth
    },
    {
      path: '/alerts/notifications',
      name: 'Notify',
      component: Notify
    },
  ]
})

export default router

function requireAuth (to, from, next) {
  const authUser = store.state.isLoggedIn
    if (authUser) {
        return next()
    } else {
        return next('/login')
    }
}

function requireVisitors (to, from, next) {
  const authUser = store.state.isLoggedIn
    if (! authUser ) {
        return next()
    } else {
        return next('/')
    }
}
