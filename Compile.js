class Compile{
    constructor(el, data, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.data = data
        this.vm = vm
        if(this.el){
            // 获取文档碎片对象 放入内存中减少页面回流和重绘
            const fragment = this.node2Fragment(this.el)

            this.compile(fragment, this.data)
            // 追加元素到vue根节点
            this.el.appendChild(fragment)
        }
    }

    // 是否元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }

    node2Fragment(el) {
        // 创建文档碎片
        const f = document.createDocumentFragment()
        let firstChild
        while(firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }

    compile(fragment) {
        const cnodes = [...fragment.childNodes]
        cnodes.forEach(child => {
            if(this.isElementNode(child)) { // 元素节点
                this.compileElement(child)
            } else {
                this.compileText(child)
            }
            if(child.childNodes && child.childNodes.length > 0) {
                this.compile(child)
            }
        })
    }

    compileElement(node) {
        const attrs = [...node.attributes] // v-text="message"
        attrs.forEach( a => {
            const { name, value } = a
            if(this.isDirective(name)) { // v-text v-on:click
                const [,directive] = name.split('v-') // text on:click
                const [dirName, eventName] = directive.split(':')
                compileUtil[dirName](node, value, this.vm, eventName)
                // 删除元素节点上的指令属性
                node.removeAttribute(`v-${directive}`)
            }
        })
    }

    compileText(node) { // {{}}
        // compileUtil['text'](node, node.textContent, this.vm)
        const expr = node.textContent
        let value
        if(expr.indexOf('{{') !== -1) {
            value = expr.replace(/\{\{(.+?)\}\}/g, (...w) => {
                return compileUtil.getValue(w[1], this.vm)
            })
            compileUtil.updater.textUpdater(node, value)
        }
    }

    isDirective(name) {
        return name.startsWith('v-') // ☆startsWith
    }
}