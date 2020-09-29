export default {
    data () {
        return {
            msg: 'hello world'
        }
    },
    created: function () {
        console.log('Printing from the Mixin')
    },
    methods: {
        print: function (msg) {
            console.log(msg)
        }
    }
}
