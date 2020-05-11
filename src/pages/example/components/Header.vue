<template>
    <div class="header-title">
        <a class="go-back" href="javascript:history.back()">
            <i class="el-icon-arrow-left"></i>
        </a>
        {{ pageName }}
    </div>
</template>
<script>
export default {
    name: 'Header',
    props: {
        pageName: {
            type: String,
            required: false,
            default: 'star garden'
        }
    },
    data () {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.header-title {
    position: relative;
    font-size: 0.18rem;
    font-weight: bold;
    color: #ccc;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    .go-back {
        position: absolute;
        color: #ccc;
        left: 0.2rem;
        top: 50%;
        transform: translate(0, -50%);
    }
}
</style>
