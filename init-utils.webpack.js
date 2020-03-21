const wasmModule = require("./monero_utils/MyMoneroCoreCpp_WASM.wasm");
const MyMoneroCoreBridgeClass = require("./monero_utils/MyMoneroCoreBridgeClass");
const wasmJS = require("./monero_utils/MyMoneroCoreCpp_WASM.js");

function initUtils() {
	return new Promise(function(resolve, reject) {
		const Module_template = {};
		Module_template["locateFile"] = () => wasmModule;

		wasmJS(Module_template)
			.ready.then(function(thisModule) {
				const instance = new MyMoneroCoreBridgeClass(thisModule);
				resolve(instance);
			})
			.catch(function(e) {
				console.error("Error loading WASM_MyMoneroCoreCpp:", e);
				reject(e);
			});
	});
}

module.exports = {
	monero_utils_promise: initUtils(),
};
