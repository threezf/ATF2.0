import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/login/index.vue";
import Show from "@/views/show/index.vue";
import InnerProject from "@/views/inner-project/index.vue";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Main",
			redirect: "/login"
		},
		{
			path: "/login",
			name: "Login",
			component: Login
		},
		{
			path: "/show",
			name: "Show",
			component: Show
		},
		{
			path: "/inner-project",
			name: "InnerProject",
			component: InnerProject
		}
	]
});
