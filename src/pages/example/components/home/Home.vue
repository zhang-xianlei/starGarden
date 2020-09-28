<template>
    <div class="home">
        <div class="search-form">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import mixins from './mixins'
export default {
    name: 'Home',
    mixins: [mixins],
    data () {
        return {
            titile: 'print from vue',
        }
    },
    mounted () {
        this.print(this.title)
    },
}
</script>
