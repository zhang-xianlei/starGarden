<template>
    <div class="footer-nav">
        <NavItem
            v-for="(item, index) in ITEMS_DATA"
            :key="index"
            :itemName="item.itemName"
            :pathStr="item.pathStr"
            :iconClass="item.iconClass"
            :curNav="curNav"
        />
    </div>
</template>
<script>
import NavItem from './NavItem'

import { mapState } from 'vuex'

const ITEMS_DATA = [
    {
        iconClass: 'icon-jiatingguanli',
        pathStr: '/family',
        itemName: '我家保单'
    },
    {
        iconClass: 'icon-jiangbei',
        pathStr: '/familyBills',
        itemName: '我家账本'
    },
    {
        iconClass: 'icon-gerenzhongxin',
        pathStr: '/userCenter',
        itemName: '我的'
    }
]
export default {
    name: 'FooterNav',
    components: {
        NavItem
    },
    data () {
        return {
            ITEMS_DATA
        }
    },
    computed: {
        ...mapState({
            curNav: state => state.curNav
        })
    }
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
