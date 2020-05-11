<template>
    <div class="toast-wrapper">
        {{ toastTip }}
        <img src="../assets/a.jpg" />
    </div>
</template>
<script>
export default {
    name: "Toast",
    data() {
        return {
            toastTip: "这是弹窗"
        };
    }
};
</script>
<style lang="scss" scoped>
.toast-wrapper {
    width: 100px;
    height: 100px;
    opacity: 0.5;
}
</style>
