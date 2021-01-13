require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');
window.moment = moment;

Vue.use(VueRouter);

import {routes} from './routes';

const router = new VueRouter({
	routes,
	// mode: 'history',
});

import mainapp from './views/Main.vue';

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
