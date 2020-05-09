class mVue{
    constructor(options) {
        const { el , data, methods } = options
        this.$el = el
        this.$data = data
        this.$methods = methods
        this.$options = options

        // 数据观察者
        // 编译器
        new Compile(this.$el, this.$data, this)
    }
}