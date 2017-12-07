import imgReaderVue from './main.vue'

let imgReader = {};

imgReader.install = function(Vue) {
	let imgReaderTpl = Vue.extend(imgReaderVue);
	Vue.prototype.$imgReader = (src) => {
		let tpl = new imgReaderTpl({
				propsData: {
					src: src
				}
			})
			.$mount()
			.$on('close', () => {
				document.body.removeChild(tpl);
				document.body.style.overflow = null;
			})
			.$el;
		document.body.appendChild(tpl);
		document.body.style.overflow = 'hidden';
	}
}

if (typeof exports == "object") {
  module.exports = imgReader
// 支持 AMD
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return imgReader })
// Vue 是全局变量时，自动调用 Vue.use()
} else if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(imgReader)
}

export default imgReader
