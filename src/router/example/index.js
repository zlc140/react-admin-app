import asyncComponent from "../asyncComponent";

const Todo = asyncComponent(() => import('@/page/Todo'));
const Article = asyncComponent(() => import('@/page/Article'));
const RenderProp = asyncComponent(() => import('@/page/Article/RenderProp'));
const StateProvance = asyncComponent(() => import('@/page/Article/stateProvance'));
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
            },
            {
                // isMenu: false,
                name: '状态提升',
                path: '/stateProvance',
                icon: 'filter',
                component: StateProvance,
            }
        ]
    }
]
