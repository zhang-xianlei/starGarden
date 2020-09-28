export default {
    data () {
        msg: 'hello world'
    },
    created: function () {
        console.log('print by mixin')
    },
    methods: {
        print: function () {
            console.log(this.title)
        }
    }
}
