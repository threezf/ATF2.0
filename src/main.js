// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import TableComp from "@/components/frames/table/index";
import store from "./store/index";
import htmlToPdf from "@/utils/htmlToPdf";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("TableComp", TableComp);
Vue.use(htmlToPdf);

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,
	components: { App },
	template: "<App/>"
});
