const path = require('path')
const MyMoneroCoreBridgeClass = require('./MyMoneroCoreBridgeClass')
const wasmJS = require('./MyMoneroCoreCpp_WASM.js')

module.exports = async function() {
  const Module_template = {
    locateFile: (filename, scriptDirectory) => path.join(scriptDirectory, filename)
  }
  const thisModule = await wasmJS(Module_template).ready
  return new MyMoneroCoreBridgeClass(thisModule)
}