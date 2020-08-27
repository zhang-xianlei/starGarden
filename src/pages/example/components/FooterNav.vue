<template>
    <div class="footer-nav">
        <NavItem
            v-for="(item, index) in ITEMS_DATA"
            :key="index"
            :itemName="item.itemName"
            :pathStr="item.pathStr"
            :iconClass="item.iconClass"
        />
    </div>
</template>
<script>
import NavItem from './NavItem'

const ITEMS_DATA = [
    {
        iconClass: 'icon-bijiben',
        pathStr: '/home',
        itemName: '首页',
    },
    {
        iconClass: 'icon-heiban',
        pathStr: '/activity',
        itemName: '活动中心',
    },
    {
        iconClass: 'icon-biyesheng',
        pathStr: '/userCenter',
        itemName: '我的',
    },
]
export default {
    name: 'FooterNav',
    components: {
        NavItem,
    },
    data () {
        return {
            ITEMS_DATA,
        }
    },
    computed: {},
}
</script>
<style lang="scss" scoped>
.footer-nav {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    padding: 0.1rem 0 0.05rem;
    border-top: 1px solid rgba(199, 196, 196, 0.9);
    background-color: #fff;
}
</style>
