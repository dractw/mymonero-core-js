// Copyright (c) 2014-2019, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Original Author: Lucas Jones
// Modified to remove jQuery dep and support modular inclusion of deps by Paul Shapiro (2016)
// Modified to add RingCT support by luigi1111 (2017)
//
// v--- These should maybe be injected into a context and supplied to currencyConfig for future platforms
const MyMoneroBridge_utils = require('./MyMoneroBridge_utils')
//
class MyMoneroCoreBridgeEssentialsClass
{
	constructor(this_Module)
	{
		this.Module = this_Module;
	}
	//
	mnemonic_from_seed(
		seed_string,
		wordset_name
	) {
		const args =
		{
			seed_string: seed_string,
			wordset_name: MyMoneroBridge_utils.api_safe_wordset_name(wordset_name)
		};
		const args_str = JSON.stringify(args);
		const ret_string = this.Module.mnemonic_from_seed(args_str);
		const ret = JSON.parse(ret_string);
		if (typeof ret.err_msg !== 'undefined' && ret.err_msg) {
			throw ret.err_msg // TODO: maybe return this somehow
		}
		return ret.retVal;
	}

	address_and_keys_from_seed(seed, network)  {
		const args = {
			seed_string: seed,
			nettype_string: network,
		}

		const args_str = JSON.stringify(args)
		const ret_string = this.Module.address_and_keys_from_seed(args_str)
		const ret = JSON.parse(ret_string)

		return ret
	}

	generate_key_image(
		tx_pub_key,
		sec_viewKey_string,
		pub_spendKey_string,
		sec_spendKey_string,
		out_index
	) {
		const args_str = JSON.stringify({
			tx_pub_key ,
			sec_viewKey_string,
			pub_spendKey_string,
			sec_spendKey_string,
			out_index
		})
		const ret_string = this.Module.generate_key_image(args_str)
		const ret = JSON.parse(ret_string)

		return ret

	}

	decode_address(address, network) {
		const args = {
			address,
			nettype_string: network,
		}

		const args_str = JSON.stringify(args)
		const ret_string = this.Module.decode_address(args_str)
		const ret = JSON.parse(ret_string)

		return ret
	}

	estimate_fee(args) {
		const args_str = JSON.stringify(args)

		const ret_string = this.Module.estimate_fee(args_str)
		const ret = JSON.parse(ret_string)

		return ret.retVal
	}

	prepare_transaction (args) {
		const args_str = JSON.stringify(args)

		const ret_string = this.Module.send_step1__prepare_params_for_get_decoys(args_str)
		const ret = JSON.parse(ret_string)

		return ret
	}

	create_transaction (args) {
		const args_str = JSON.stringify(args)

		console.log(args)
		const ret_string = this.Module.send_step2__try_create_transaction(args_str)
		const ret = JSON.parse(ret_string)

		return ret
	}
}
//
module.exports = MyMoneroCoreBridgeEssentialsClass
