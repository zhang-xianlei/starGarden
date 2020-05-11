<template>
    <div
        class="ValidCode disabled-select"
        :style="`width:${width}; height:${height}`"
        @click="refreshCode"
    >
        <span
            v-for="(item, index) in codeList"
            :key="index"
            :style="getStyle(item)"
            >{{ item.code }}</span
        >
    </div>
</template>

<script>
export default {
    name: 'ValidCode',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        width: {
            type: String,
            default: '2rem'
        },
        height: {
            type: String,
            default: '.6rem'
        },
        length: {
            type: Number,
            default: 4
        },
        refresh: {
            type: Number
        }
    },
    data () {
        return {
            codeList: [],
            codeStr: ''
        }
    },
    watch: {
        refresh () {
            this.createdCode()
        }
    },
    mounted () {
        this.createdCode()
    },
    methods: {
        refreshCode () {
            this.createdCode()
        },
        createdCode () {
            const len = this.length
            const codeList = []
            const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
            const charsLen = chars.length
            this.codeStr = ''
            // 生成
            for (let i = 0; i < len; i++) {
                const rgb = [
                    Math.round(Math.random() * 220),
                    Math.round(Math.random() * 240),
                    Math.round(Math.random() * 200)
                ]
                const codeItem = chars.charAt(
                    Math.floor(Math.random() * charsLen)
                )
                this.codeStr += codeItem
                codeList.push({
                    code: codeItem,
                    color: `rgb(${rgb})`,
                    fontSize: `${10 +
                        (+[Math.floor(Math.random() * 10)] + 16)}px`,
                    padding: `${[Math.floor(Math.random() * 10)]}px`,
                    transform: `rotate(${Math.floor(Math.random() * 90) -
                        Math.floor(Math.random() * 90)}deg)`
                })
            }
            // 指向
            this.codeList = codeList
            this.$emit('getValidateCode', this.codeStr)
            // 将当前数据派发出去
            this.$emit('input', codeList.map(item => item.code).join(''))
        },
        getStyle (data) {
            return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
        }
    }
}
</script>

<style scoped lang="scss">
.ValidCode {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 0.2rem;
    background-color: rgba(0, 0, 0, 0.1);
    span {
        display: inline-block;
    }
}
</style>
