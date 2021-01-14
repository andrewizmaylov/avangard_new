export const routes = [
	{path: '/', name: 'orders', component: () => import(/* webpackChunkName: "orders"*/ "./views/components/Orders.vue"), meta: {requiresAuth: false} },
	{path: '/edit', name: 'editOrder', component: () => import(/* webpackChunkName: "editOrder"*/ "./views/components/EditOrder.vue"), meta: {requiresAuth: false} },

]