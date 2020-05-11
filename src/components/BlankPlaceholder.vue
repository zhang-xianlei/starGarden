<template>
    <div class="blank-placeholder">
        <div>{{ placeholder }}</div>
        <el-button v-if="handleTip" type="primary" @click="blankHandler">{{
            handleTip
        }}</el-button>
    </div>
</template>
<script>
export default {
    name: 'BankPlaceholder',
    props: {
        placeholder: {
            type: String,
            required: false,
            default: '暂无数据'
        },
        handleTip: {
            type: String,
            required: false
        },
        blankHandler: {
            type: Function,
            required: false
        }
    },
    data () {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.blank-placeholder {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    text-align: center;

    & > div:first-child {
        margin-bottom: 0.2rem;
    }
}
</style>
