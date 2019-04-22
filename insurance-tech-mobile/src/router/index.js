import Vue from 'vue'
import Router from 'vue-router'
import base from '@/api/base'; // 导入接口域名列表
import INTERFACE from "@/api/index";
const PEIBANBAOINTERFACE = INTERFACE.peibanInsuranceList;
// 正常加载
// import Home from '../views/home'
// import About from '../views/About'

// 按需（懒）加载（vue实现）
// const Index = () => import( /* webpackChunkName: "index" */ '../views/pbb/index')
// const Insure = () => import( /* webpackChunkName: "insure" */ '../views/pbb/insure')
// const PolicyDetails = () => import( /* webpackChunkName: "policyDetails" */ '../views/pbb/policyDetails')
// const OrderDetails = () => import( /* webpackChunkName: "orderDetails" */ '../views/pbb/orderDetails')
// const Guide = () => import( /* webpackChunkName: "guide" */ '../views/pbb/guide')
// const Personal = () => import( /* webpackChunkName: "personal" */ '../views/pbb/personal')
// const SecurityDetails = () => import( /* webpackChunkName: "securityDetails" */ '../views/pbb/securityDetails')
// const Scope = () => import( /* webpackChunkName: "scope" */ '../views/pbb/scope')

// import Index from '@/views/pbb/index';
// import Insure from '@/views/pbb/insure';
// import PolicyDetails from '@/views/pbb/policyDetails';
// import OrderDetails from '@/views/pbb/orderDetails';
// import Guide from '@/views/pbb/guide';
// import Personal from '@/views/pbb/personal';
// import SecurityDetails from '@/views/pbb/securityDetails';
// import Scope from '@/views/pbb/scope';

const Index = r => require.ensure([], () => r(require('@/views/pbb/index')), 'Index')
const Insure = r => require.ensure([], () => r(require('@/views/pbb/insure')), 'Insure')
const PolicyDetails = r => require.ensure([], () => r(require('@/views/pbb/policyDetails')), 'PolicyDetails')
const OrderDetails = r => require.ensure([], () => r(require('@/views/pbb/orderDetails')), 'Insure')
const Guide = r => require.ensure([], () => r(require('@/views/pbb/guide')), 'Insure')
const Personal = r => require.ensure([], () => r(require('@/views/pbb/personal')), 'Insure')
const Scope = r => require.ensure([], () => r(require('@/views/pbb/scope')), 'Insure')
const WxIndex = r => require.ensure([], () => r(require('@/views/pbb/wxIndex')), 'WxIndex')
// const PDF = r => require.ensure([], () => r(require('@/static/files/item.pdf')), 'PDF')
Vue.use(Router)

// let base = `${process.env.BASE_URL}` // 动态获取二级目录

const router = new Router({
    // mode: 'history',
    // base: base,
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/insure',
            name: 'Insure',
            component: Insure,
            meta: {
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/policyDetails',
            name: 'PolicyDetails',
            component: PolicyDetails,
            meta: {
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/orderDetails',
            name: 'OrderDetails',
            component: OrderDetails,
            meta: {
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/guide',
            name: 'Guide',
            component: Guide
        },
        {
            path: '/scope',
            name: 'Scope',
            component: Scope
        },
        {
            path: '/personal',
            name: 'Personal',
            component: Personal,
            meta: {
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/wxIndex',
            name: 'WxIndex',
            component: WxIndex
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

router.beforeEach((to, from, next) => {
    // 做些什么，通常权限控制就在这里做哦

    // 必须写next()哦，不然你的页面就会白白的，而且不报错，俗称"代码下毒"
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        let nethref = encodeURIComponent('http://ttxapi.jd.com/pbb#/insure');
        PEIBANBAOINTERFACE.pinStaff({}).then( pin => {
            if (pin.data.code != 1) {
                PEIBANBAOINTERFACE.appidStaff({}).then( appi => {
                    const appid = appi.data.data;
                    window.location.href = `${base.login}/user/login.action?appid=${appid}&returnurl=${nethref}&wxautologin=false&qqautologin=false&qbautologin=false&qqlogin=false&wxlogin=false`
                })   
            } else {
                next();
            }
        })
    }
    else {
        next();
    }
});

export default router;
