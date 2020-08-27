<template>
    <div class="nav-item">
        <router-link :to="pathStr" :class="isActive && 'active'">
            <div class="item-icon">
                <span class="iconfont" :class="iconClass"></span>
            </div>
            <div class="itme-title">{{ itemName }}</div>
        </router-link>
    </div>
</template>
<script>
import '@styles/fonts/iconfont.css'
export default {
    name: 'NavItem',
    props: {
        iconClass: {
            required: true,
            type: String,
        },
        itemName: {
            required: true,
            type: String,
        },
        pathStr: {
            required: true,
            type: String,
        },
        curNav: {
            required: false,
            type: String,
            default: '',
        },
    },
    data () {
        return {}
    },
    computed: {
        isActive: function () {
            return this.pathStr === `/${this.curNav}`
        },
    },
}
</script>
<style lang="scss" scoped>
.nav-item {
    flex: 1;
    font-size: 0.16rem;
    color: #333;
    text-align: center;
    & .active {
        color: #ff5244;
    }
    a:focus {
        outline: none;
    }

    .item-icon {
        margin-bottom: 0.05rem;
    }
}
</style>
