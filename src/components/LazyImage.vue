<template>
    <img :src="url" :style="imageStyle" @click="showImgDetail" />
</template>

<script>
export default {
    name: 'LazyImage',
    props: ['defaultImageUrl', 'imageUrl', 'imageStyle', 'showDetail'],
    data () {
        return {
            loaded: false
        }
    },
    computed: {
        url () {
            if (!this.imageUrl) {
                return this.defaultImageUrl
            }
            if (this.loaded) {
                return this.imageUrl
            } else {
                return this.defaultImageUrl
            }
        }
    },
    mounted () {
        this.loadImage()
    },
    watch: {
        imageUrl () {
            this.loaded = false
            this.loadImage()
        }
    },
    methods: {
        loadImage () {
            if (!this.imageUrl) return
            let fakeImage = new Image()
            fakeImage.src = this.imageUrl
            fakeImage.onload = e => {
                this.loaded = true
                fakeImage = null
            }
        },
        showImgDetail () {
            if (this.showDetail) {
                this.$emit(
                    'showDetailImg',
                    this.imageUrl || this.defaultImageUrl
                )
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
