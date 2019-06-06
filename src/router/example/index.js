import asyncComponent from "../asyncComponent";

const Todo = asyncComponent(() => import('@/page/Todo'));
const Article = asyncComponent(() => import('@/page/Article'));
const RenderProp = asyncComponent(() => import('@/page/Article/RenderProp'));
export default [
    {
        name: '例子管理',
        path: '/article',
        icon: 'apartment',
        children: [
            {
                name: '富文本编辑',
                path: '',
                icon: 'bars',
                component: Article,
            },
            {
                name: 'TODO例子',
                path: '/todo',
                icon: 'diff',
                component: Todo
            },
            {
                // isMenu: false,
                name: 'RenderProp',
                path: '/RenderProp',
                icon: 'filter',
                component: RenderProp,
            }
        ]
    }
]
