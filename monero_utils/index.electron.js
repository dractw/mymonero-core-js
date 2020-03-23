const MyMoneroCoreBridgeClass = require('./MyMoneroCoreBridgeClass')
const wasmJS = require('./MyMoneroCoreCpp_WASM.js')
const path = require('path')

module.exports = async function loadMymoneroWasm() {
  const Module_template = {
    locateFile: () => path.resolve(__dirname, 'MyMoneroCoreCpp_WASM.wasm')
  }
  const thisModule = await wasmJS(Module_template).ready
  return new MyMoneroCoreBridgeClass(thisModule)
}