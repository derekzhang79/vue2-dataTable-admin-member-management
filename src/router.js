import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './login.vue'

import Home from './components/main/home.vue'

import OperatingHome from './components/main/operating_home.vue'
import OperatingPersonal from './components/main/operating_personal.vue'

import MemberHome from './components/main/member_home.vue'
import MemberPersonalCenter from './components/main/member_personalCenter.vue'

import CouponHome from './components/main/coupon_home.vue'
import CouponAdd from './components/main/coupon_add.vue'
import CouponUpdate from './components/main/coupon_update.vue'
import CouponDetail from './components/main/coupon_detail.vue'

import ServiceHome from './components/main/service_home.vue'
import ServiceAdd from './components/main/service_add.vue'

import MemberConsumption from './components/main/member_consumption.vue'

//安装插件
Vue.use(VueRouter)

// 配置路由规则
const routes = [{
    path: '',
    name: 'home',
    components: {
      main: Home
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      login: Login,
      main: Home
    }
  },
  {
    path: '/operating_home',
    name: 'operating_home',
    components: {
      main: OperatingHome
    }
  },
  {
    path: '/operating_personal',
    redirect: 'operating_home',
  },
  {
    path: '/operating_personal/:member_id',
    components: {
      main: OperatingPersonal
    }
  },
  {
    path: '/member_home',
    name: 'member_home',
    components: {
      main: MemberHome
    }
  },
  {
    path: '/member_consumption',
    components: {
      main: MemberConsumption
    }
  },
  {
    path: '/member_personalCenter',
    redirect: 'member_home'
  },
  {
    path: '/member_personalCenter/:member_id',
    components: {
      main: MemberPersonalCenter
    }
  },
  {
    path: '/coupon_home',
    components: {
      main: CouponHome
    }
  },
  {
    path: '/coupon_add',
    components: {
      main: CouponAdd
    }
  },
  {
    path: '/coupon_add/:coupon_type',
    components: {
      main: CouponAdd
    }
  },
  {
    path: '/coupon_update/:coupon_id',
    components: {
      main: CouponUpdate
    }
  },
  {
    path: '/coupon_detail/:coupon_id',
    components: {
      main: CouponDetail
    }
  },
  {
    path: '/service_home',
    components: {
      main: CouponAdd
    }
  },
  {
    path: 'service_add',
    components: {
      main: CouponAdd
    }
  }
]

// 实例路由对象
let router = new VueRouter({
  routes

})

export default router
