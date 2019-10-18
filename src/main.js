import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    mounted () {
        this.$store.dispatch('fetchTop100');
        this.$store.dispatch('fetchList');
    },
    created () {
        this.$store.watch(
            (state, getters) => getters.getLoadingTop,
            (newValue, oldValue) => {
                if (oldValue && !newValue)
                    setTimeout(() => this.$store.dispatch('fetchTop100'), 10000)
            }
        );
        this.$store.watch(
            (state, getters) => getters.getLoadingMain,
            (newValue, oldValue) => {
                if (oldValue && !newValue)
                    setTimeout(() => this.$store.dispatch('fetchList'), 10000)
            }
        );
    }
}).$mount('#app');
