class Observer{
    constructor(data){
        this.observe(data)
    }

    observe(data){
        if(data && typeof data === 'object') {
            Object.keys(data).map(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }

    // get set
    defineReactive(data, key, value){
        this.observe(value)
        const dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: () => {
                Dep.target && dep.addSub(Dep.target) // 收集依赖
                return value
            },
            set: (newValue) => {
                if(newValue !== value) {
                    data[key] = newValue
                    dep.notify()
                }
            }
        })
    }
}