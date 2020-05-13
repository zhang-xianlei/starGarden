<template>
    <div class="sign">
        <img :src="userPortrait" />
        <div class="name-sec">new user</div>
    </div>
</template>

<script>
import userPortrait from '@assets/default-portrait.png'
export default {
    data () {
        return {
            userPortrait
        }
    }
}
</script>

<style lang="scss" scoped>
.sign {
    text-align: center;
    img {
        width: 20%;
        margin: 0.2rem auto;
    }
    .name-sec {
        color: #e11;
    }
}
</style>
