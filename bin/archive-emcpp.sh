#!/bin/sh

rm -f monero_utils/MyMoneroCoreCpp_*
bin/build-emcpp.sh &&
cp build/MyMoneroCoreCpp_WASM.js monero_utils/; 
cp build/MyMoneroCoreCpp_WASM.wasm monero_utils/;
