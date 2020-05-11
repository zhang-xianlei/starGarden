<template>
    <div class="item-box" @click="skipHandler">{{ skipDes }}</div>
</template>
<script>
export default {
    name: 'ItemBox',
    props: {
        skipDes: {
            type: String,
            required: true
        },
        skipHandler: {
            type: Function,
            required: true
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.item-box {
    width: 90%;
    margin: 0.1rem auto;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.1rem;
    box-shadow: 0 0 8px rgba(232, 237, 250, 0.9),
        0 2px 4px rgba(232, 237, 250, 0.7);
    text-align: center;
}
</style>
