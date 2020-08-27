<template>
    <div class="app">
        <Header />
        <div class="view">
            <router-view></router-view>
        </div>
        <FooterNav />
    </div>
</template>
<script>
import Header from './components/Header'
import FooterNav from './components/FooterNav'
export default {
    name: 'App',
    components: {
        Header,
        FooterNav,
    },
    data () {
        return {}
    },
    computed: {},
}
</script>

<style lang="scss">
html,
body {
    height: 100%;
}
.view {
    position: absolute;
    width: calc(100% - 0.16rem);
    top: 0.5rem;
    left: 0.08rem;
    bottom: 0.585rem;
    overflow-x: hidden;
}
</style>
