module.exports = class RouterCreater {
    constructor(props) {
        this.props = props;
        this.layoutNum = 0;
    }

    createRoutes() {
        const { router } = this.props;
        const routes = [];//扫描路由结构
        router.forEach(comp => {
            this.travelRoute(comp, null, routes);
        })
        const result = { defines: [], nests: [], routes: [] };//最终生成的路由
        const layouts = {}; //过滤多余的布局声明
        let index = 0;
        while (routes.length > 0) {
            let node = routes.pop();
            if (!node)
                continue;
            node.forEach(route => {
                if (route.pages) {          //嵌套布局路由生成
                    //过滤多余的布局声明
                    let layout = layouts[route.component];
                    if (!layout) {
                        layout = { index, component: route.component };
                        layouts[route.component] = layout;
                        result.defines.push(`const Layout${layout.index} = require('@/${layout.component}').default; \n`);
                    }
                    //开始生成路由信息
                    result.nests.push(`const Route${index} = (props) => <Layout${layout.index} props={props}>
    <Switch>${route.pages.map(page => `
        <Route exact path={'${page.path}'}
            component={dynamic({
                component: () => import('@/${page.component}'),
                LoadingComponent: require('@/components/PageLoading').default,
            })} />`).join("")}  
        <Redirect to='/404' />
    </Switch>
</Layout${layout.index}> \n`);
                    result.routes.push(`            <Route path={'${route.path}'} component={Route${index}} /> \n`);
                } else {                    //独立路由生成
                    result.routes.push(`            <Route exact path={'${route.path}'}
                component={dynamic({
                    component: () => import('@/${route.component}'),
                    LoadingComponent: require('@/components/PageLoading').default,
                })} /> \n`);
                }
                index++;
            });
        }
        return result;
    }

    urlDepth(url) {
        if (!url)
            return 0;
        let newUrl = url;
        if (newUrl.startsWith('/'))
            newUrl = newUrl.substr(1);
        let len = 0;
        if (newUrl.trim() != '')
            len = newUrl.split('/').length;
        return len;
    }

    travelRoute(node, layout, routes) {
        let newLayout = layout;
        if (node.layout) {//处理布局节点
            newLayout = { path: node.path, component: node.layout };
            let len = this.urlDepth(node.path);
            if (!this.props.rootUnest || len > 0) {
                if (!routes[len])
                    routes[len] = [];
                newLayout.pages = [];
                routes[len].push(newLayout);
            }
        } else {    //处理路由节点
            if (node.path) {
                if (newLayout) {
                    if (!newLayout.pages) {
                        newLayout = { path: node.path, component: layout.component, pages: [] };
                        let len = this.urlDepth(node.path);
                        if (!routes[len])
                            routes[len] = [];
                        routes[len].push(newLayout);
                    }
                    if (node.component)
                        newLayout.pages.push({ path: node.path, component: node.component });

                }
                else {
                    let len = this.urlDepth(node.path);
                    if (!routes[len])
                        routes[len] = [];
                    routes[len].push({ path: node.path, component: node.component })
                }
            }
        }
        if (node.pages && node.pages.length > 0) {
            node.pages.forEach(page => {
                this.travelRoute(page, newLayout, routes);
            })
        }
    }

    create() {
        const { hashHistory } = this.props;//是否使用hashHistory（默认BrowserHistory）
        const router = hashHistory ? "HashRouter" : "BrowserRouter";
        const result = this.createRoutes();

        return `
import React from 'react';
import dynamic from '@/frameworks/reduxaga/dynamic';
import { ${router}, Route, Redirect, Switch } from '@/frameworks/reduxaga/router';
${result.defines.join("")}
${result.nests.join("")}
export default (props) =>
    <${router} {...props}>
        <Switch>
${result.routes.join("")}
            <Redirect to='/404' />
        </Switch>
    </${router}>
`;
    }
}