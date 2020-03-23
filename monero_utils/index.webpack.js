const MyMoneroCoreBridgeClass = require('./MyMoneroCoreBridgeClass')
const wasmJS = require('./MyMoneroCoreCpp_WASM.js')
const wasmModule = require('./MyMoneroCoreCpp_WASM.wasm')

module.exports = async function loadMymoneroWasm() {
  const Module_template = {
    locateFile: () => wasmModule
  }
  const thisModule = await wasmJS(Module_template).ready
  return new MyMoneroCoreBridgeClass(thisModule)
}