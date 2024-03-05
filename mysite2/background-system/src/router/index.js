import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "控制台", icon: "dashboard", auto: true },
      },
    ],
  },
  {
    path: "/banner",
    component: Layout,

    children: [
      {
        path: "index",
        name: "Banner",
        component: () => import("@/views/banner/index"),
        meta: { title: "首页标语", icon: "el-icon-s-home", auto: true },
      },
    ],
  },

  {
    path: "/articlemanage",
    component: Layout,
    redirect: "/articlemanage/list",
    name: "Articlemanage",
    meta: { title: "文章管理", icon: "el-icon-document" },
    children: [
      {
        path: "list",
        name: "Articlelist",
        component: () => import("@/views/articlemanage/list/index"),
        meta: { title: "文章列表", icon: "el-icon-s-order", auto: true },
      },
      {
        path: "classify",
        name: "Articleclassify",
        component: () => import("@/views/articlemanage/classify/index"),
        meta: { title: "文章分类", icon: "el-icon-menu", auto: true },
      },
      {
        path: "add",
        name: "Addarticle",
        component: () => import("@/views/articlemanage/add/index"),
        meta: { title: "添加文章", icon: "el-icon-circle-plus", auto: true },
      },
      {
        path: "/editBlog/:id",
        name: "Editarticle",
        hidden: true,
        component: () => import("@/views/articlemanage/edit/index"),
        meta: { title: "编辑文章", icon: "el-icon-circle-plus", auto: true },
      },
    ],
  },
  {
    path: "/itemmanage",
    component: Layout,
    redirect: "/itemmanage/list",
    name: "Itemmanage",
    meta: { title: "项目管理", icon: "el-icon-suitcase" },
    children: [
      {
        path: "list",
        name: "Itemlist",
        component: () => import("@/views/itemmanage/list/index"),
        meta: { title: "项目列表", icon: "el-icon-notebook-1", auto: true },
      },

      {
        path: "add",
        name: "Additem",
        component: () => import("@/views/itemmanage/add/index"),
        meta: { title: "添加项目", icon: "el-icon-link", auto: true },
      },
    ],
  },

  {
    path: "/comment",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Comment",
        component: () => import("@/views/comment/index"),
        meta: { title: "评论管理", icon: "form", auto: true },
      },
    ],
  },
  {
    path: "/message",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Message",
        component: () => import("@/views/message/index"),
        meta: { title: "留言板", icon: "el-icon-copy-document", auto: true },
      },
    ],
  },
  {
    path: "/about",
    component: Layout,
    children: [
      {
        path: "index",
        name: "About",
        component: () => import("@/views/about/index"),
        meta: { title: "关于我", icon: "el-icon-s-custom", auto: true },
      },
    ],
  },
  {
    path: "/set",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Set",
        component: () => import("@/views/set/index"),
        meta: { title: "设置", icon: "el-icon-s-tools", auto: true },
      },
    ],
  },
  {
    path: "/personalSetting",
    component: Layout,
    hidden: true,
    meta: { children: ["/personalSetting"] },
    children: [
      {
        path: "/personalSetting",
        name: "PersonalSetting",
        component: () => import("@/views/personalSetting/index"),
        meta: { title: "个人中心", icon: "el-icon-document-copy", auth: true },
      },
    ],
  },

  {
    path: "/nested",
    hidden: true,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: "Menu2",
        meta: { title: "menu2" },
      },
    ],
  },

  {
    path: "external-link",
    hidden: true,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "External Link", icon: "link" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
