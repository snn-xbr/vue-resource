class Watcher{
    constructor(vm, expr, cb){
        this.vm = vm
        this.expr = expr
        this.cb = cb
        this.oldValue = this.getOldValue()
    }

    getOldValue() {
        Dep.target = this // 把当前的观察者给Dep.target
        const oldValue = compileUtil.getValue(this.expr, this.vm)
        Dep.target = null
        return oldValue
    }

    update() {
        const newValue = compileUtil.getValue(this.expr, this.vm)
        if(newValue !== this.oldValue) {
            this.cb(newValue)
        }
    }
}

const unique = (arr) => [... new Set(arr)]
const unique = (arrObj) => {
    const uniqueArr = [];
    const temp = [];
    for(let i=0; i<arrObj.length; i++) {
        if(temp.indexOf(arrObj[i].id) === -1) {
            uniqueArr.push(arrObj[i]);
            temp.push(arrObj[i].id);
        }
    }
    return uniqueArr;
}

const unique = (arrObj) => {
    return [...new Set(arrObj.map(item => [item.id, item]))]
}

unique([
    {id:1, name: 'name1'},
    {id:2, name: 'name2'},
    {id:2, name: 'name2'}
])