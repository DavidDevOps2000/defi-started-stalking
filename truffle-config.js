require('babel-register');
require('babel-polyfill');

module.exports = {
    networks:{
        development:{
            host:'127.0.0.1',
            port:'7545',
            network_id:'*'
        },
    },
    contracts_directory:'./src/contracts',
    contracts_build_directory:'./src/truffle_abis',
    compilers:{
        solc:{
            version: '>=0.4.22 <0.9.0',
            optimizer:{
                enable:true,
                runs:200
            }
        }
    }
}