import React from "react";
import asyncComponent from './asyncComponent';
import PrivateRoute from "./privateRoute";
import {Switch} from "react-router";

import example from './example'
/**
 * 数组转为map
 * @param powerList
 * @param key
 * return {*}
 */
const getMap = (powerList, key) => {
    let maps = {};
    powerList && powerList.forEach(v => {
        maps[v[key]] = v;
        v.child && v.child.forEach(m => {
            maps[m[key]] = m;
        })

    })
    return maps
}

const userInfo = sessionStorage.getItem('userInfo')
let powerList =  userInfo ? (JSON.parse(userInfo).routerLists || []) : false;
if( !powerList ) window.location.href = window.location.origin + '/login';
let routerMap = getMap(powerList, 'name');


const Home = asyncComponent(() => import('..'+'/page/Home'));
const Blog = asyncComponent(() => import('..'+'/page/Blog'));




/***
 * 路由列表
 */

export const routeConf = [
    {
        name: '首页',
        path: '/home',
        icon: 'home',
        component: Home
    }
    ,{
        name: '博客页',
        path: '/blog',
        icon: 'frown',
        component: Blog
    }
    , ...example
    ,{
        path: '/',
        redirect: '/home'
    }


]

/**
 * 路由权限判断
 * 1，接口放回的列表是否有 2.如果子存在父不存在则添加父
 * @param item
 * @param routerMap
 * @returns {boolean}
 */
export const hasPower = (item) => {

    let isHas = routerMap[item.name] ? true : false;
    if(!isHas && item.child) {
        isHas = item.child.some(m => {
            return routerMap[m.name] ? true : false;
        })
    }
    return isHas;

}

const getRouters = (routeConfs, baseUrl = '') => {
    let routerLists = [];
    routeConfs.map( item => {
        let itemConf = Object.assign({}, item)
        itemConf.path = baseUrl + itemConf.path;
        if( itemConf.children && itemConf.children.length ){
            routerLists = routerLists.concat( getRouters(itemConf.children, itemConf.path) )
            delete itemConf.children
        }
        //权限中存在或者是redirect
        (item.redirect || (itemConf.component && hasPower(item))) && routerLists.push( itemConf )
    })
    return routerLists;
}

// console.log(getRouters(routeConf))
export default getRouters(routeConf)
