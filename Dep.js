class Dep{
    constructor(){
        this.deps = []
    }

    // 收集观察者
    addSub(watcher){
        this.deps.push(watcher)
    }

    // 通知观察者更新
    notify(){
        console.log('通知观察者')
        this.deps.map( dep => {
            dep.update()
        })
    }
}