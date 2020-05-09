const compileUtil = {
    getValue: (expr, vm) => {
        return expr.split('.').reduce((data,currentVal) => { // ☆currentVal是数组每个元素，data是初始值, return的值覆盖data
            return data[currentVal]
        },vm.$data)
    },
    text: (node, expr, vm) => {
        const value = compileUtil.getValue(expr, vm)
        compileUtil.updater.textUpdater(node, value)
    },
    html: (node, expr, vm) => {
        const value = compileUtil.getValue(expr, vm)
        compileUtil.updater.htmlUpdater(node, value)
    },
    model: (node, expr, vm) => {
        const value = compileUtil.getValue(expr, vm)
        compileUtil.updater.modelUpdater(node, value)
    },
    on: (node, expr, vm, eventName) => {
        const fn = vm.$methods[expr]
        compileUtil.updater.eventUpdater(node, eventName, fn)
    },
    updater: {
        textUpdater: (node, value) => {
            node.textContent = value
        },
        htmlUpdater: (node, value) => {
            node.innerHTML = value
        },
        modelUpdater: (node, value) => {
            node.value = value
        },
        eventUpdater: (node, eventName, fn) => {
            node.addEventListener(eventName, fn)
        }
    }
}