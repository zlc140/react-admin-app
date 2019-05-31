import React from "react";
import asyncComponent from './asyncComponent';
import PrivateRoute from "./privateRoute";
import {Switch} from "react-router";


const getFile = (sourcePath) => {
    console.log(sourcePath,'sourcePath',)
    return asyncComponent(() => import(`..${sourcePath}`))
}
const Blog = getFile('/page/Blog')
const Home = getFile('/page/Home')
console.log(Blog ,'---', asyncComponent(() => import('..'+'/page/Blog')))
/***
 * 路由列表
 */

const routeConf = [
    {
        name: '首页',
        path: '/home',
        icon: '',
        component: '/page/Home'
    }
    ,{
        name: '博客页',
        path: '/blog',
        icon: '',
        component: '/page/Blog'
    }
    ,{
        name: 'TODO',
        path: '/todo',
        icon: '',
        component: '/page/Todo'
    }
    ,{
        name: '文章',
        path: '/article',
        icon: '',
        component: '/page/Article',
        children: [
            {
                name: '博客页',
                path: '/blog',
                icon: '',
                componentPath: '/page/Blog'
            }
        ]
    }
    ,{
        path: '/',
        redirect: '/home'
    }


]

let routerlist;
const getRoutes = () => {

    return routeConf.map((item,index) => {
        if(item.component){
            let goPath = item.component;
            return <PrivateRoute exact key={index} path={item.path} component={  asyncComponent(() => import(goPath)) }  />
        }

    })
}

export default getRoutes()
