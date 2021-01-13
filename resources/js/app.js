require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {routes} from './routes';

const router = new VueRouter({
	routes,
	// mode: 'history',
});

const app = new Vue({
    el: '#app',
    router,
    components: {
    	mainapp,
    },
    // computed: {
    // 	isLoggedIn() {
    // 		return store.getters.isLoggedIn;
    // 	},
	   //  isLoading() {
	   //      return this.$store.getters.isLoading;
	   //  }
    // }
});
