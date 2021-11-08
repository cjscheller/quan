import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/index.css'
import { createProvider } from './vue-apollo'

// ugh
import "regenerator-runtime/runtime.js";

Vue.config.productionTip = false

// Register global filters
Vue.filter('currency', val => {
    return '$' + Math.abs(val).toFixed(2);
});
Vue.filter('capitalCase', str => {
    return str.toLowerCase().replace(/^\w/, c => c.toUpperCase());
})
Vue.filter('monthDay', date => {
    return new Date(date).toLocaleString("en-US", { month: "short", day: "numeric" });
});

new Vue({
    router,
    apolloProvider: createProvider(),
    render: h => h(App)
}).$mount('#app')
