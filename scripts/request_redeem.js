const Web3 = require('web3');

async function requestStake() {
  const web3 = new Web3('https://mosaicdao.org/aux/1405');
  web3.transactionConfirmationBlocks = 1;

  const privateKey = '0x9bd85647112c2bf0326f4d6e0e9c1d4b8f54032420589378dd6ce7eab349aae3';
  const coGatewayAddress = '0x5efaE177C9f37E6DA82e807530EA550AA5F0AFdd';
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log('address ', account.address);
  web3.eth.accounts.wallet.add(account);
  const amountToRedeem = '11';
  const nonce = '1';
  const redeemPoolAbi = [
    {
      "constant": true,
      "inputs": [],
      "name": "REDEEMREQUEST_INTENT_TYPEHASH",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "organization",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "redeemerProxies",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "EIP712_DOMAIN_TYPEHASH",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "redeemRequestHashes",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_organization",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "gasPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "gasLimit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "nonce",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "redeemer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "redeemerProxy",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "cogateway",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "redeemRequestHash",
          "type": "bytes32"
        }
      ],
      "name": "RedeemRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "redeemer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "redeemRequestHash",
          "type": "bytes32"
        }
      ],
      "name": "RedeemRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "redeemer",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "redeemRequestHash",
          "type": "bytes32"
        }
      ],
      "name": "RedeemRejected",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_beneficiary",
          "type": "address"
        },
        {
          "name": "_gasPrice",
          "type": "uint256"
        },
        {
          "name": "_gasLimit",
          "type": "uint256"
        },
        {
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "name": "_cogateway",
          "type": "address"
        }
      ],
      "name": "requestRedeem",
      "outputs": [
        {
          "name": "redeemRequestHash_",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_beneficiary",
          "type": "address"
        },
        {
          "name": "_gasPrice",
          "type": "uint256"
        },
        {
          "name": "_gasLimit",
          "type": "uint256"
        },
        {
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "name": "_redeemer",
          "type": "address"
        },
        {
          "name": "_cogateway",
          "type": "address"
        },
        {
          "name": "_hashLock",
          "type": "bytes32"
        }
      ],
      "name": "acceptRedeemRequest",
      "outputs": [
        {
          "name": "messageHash_",
          "type": "bytes32"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_beneficiary",
          "type": "address"
        },
        {
          "name": "_gasPrice",
          "type": "uint256"
        },
        {
          "name": "_gasLimit",
          "type": "uint256"
        },
        {
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "name": "_cogateway",
          "type": "address"
        }
      ],
      "name": "revokeRedeemRequest",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_beneficiary",
          "type": "address"
        },
        {
          "name": "_gasPrice",
          "type": "uint256"
        },
        {
          "name": "_gasLimit",
          "type": "uint256"
        },
        {
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "name": "_redeemer",
          "type": "address"
        },
        {
          "name": "_cogateway",
          "type": "address"
        }
      ],
      "name": "rejectRedeemRequest",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "destructRedeemerProxy",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_beneficiary",
          "type": "address"
        },
        {
          "name": "_gasPrice",
          "type": "uint256"
        },
        {
          "name": "_gasLimit",
          "type": "uint256"
        },
        {
          "name": "_nonce",
          "type": "uint256"
        },
        {
          "name": "_redeemer",
          "type": "address"
        },
        {
          "name": "_cogateway",
          "type": "address"
        }
      ],
      "name": "hashRedeemRequest",
      "outputs": [
        {
          "name": "redeemRequestHash_",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const redeemPoolAddress = '0x2E17dE7EC319287eC419ACBe04E4a9f25f76199D';
  const redeemPoolContractInstance = new web3.eth.Contract(redeemPoolAbi, redeemPoolAddress);

  const ostPrimeAbi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "tokenName_",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "initialized",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "totalTokenSupply_",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "TOKEN_NAME",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "organization",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "TOKEN_SYMBOL",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "tokenDecimals_",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "TOKEN_DECIMALS",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance_",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "coGateway",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DECIMALSFACTOR",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "tokenSymbol_",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "TOKENS_MAX",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_coGatewayAddress",
          "type": "address"
        }
      ],
      "name": "setCoGateway",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "allowance_",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "exists",
      "outputs": [
        {
          "name": "exists_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_valueToken",
          "type": "address"
        },
        {
          "name": "_organization",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_account",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "TokenUnwrapped",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_account",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "TokenWrapped",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_coGateway",
          "type": "address"
        }
      ],
      "name": "CoGatewaySet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "initialize",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "unwrap",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "wrap",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_account",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "increaseSupply",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "decreaseSupply",
      "outputs": [
        {
          "name": "success_",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const ostPrimeAddress = '0x3b588816D166A7aac3A68B0769B0E0168A6797a3';
  const ostPrimeContractInstance = new web3.eth.Contract(ostPrimeAbi, ostPrimeAddress);

  console.log('wrapping');
  await ostPrimeContractInstance.methods.wrap().send({
    from: account.address,
    gasPrice: '0x3B9ACA00',
    gas: '3700724',
    value: amountToRedeem
  });

  console.log('approving');
  await ostPrimeContractInstance.methods.approve(redeemPoolAddress, amountToRedeem).send({
    from: account.address,
    gasPrice: '0x3B9ACA00',
    gas: '3700724'
  });

  console.log('requestRedeem');
  redeemPoolContractInstance.methods.requestRedeem(
    amountToRedeem,
    account.address,
    '0',
    '0',
    nonce,
    coGatewayAddress,
  )
    .send({
      from: account.address,
      gasPrice: '0x3B9ACA00',
      gas: '3700724',
    }).on('error', (error) => {
    console.log('Error on deployment ', error);
  })
    .on('transactionHash', (transactionHash) => {
      console.log('Transaction hash ', transactionHash);
    })
    .on('receipt', (receipt) => {
      console.log('Receipt  ', receipt);
      console.log(receipt.contractAddress);
    });
}


requestStake().catch((error) => {
  console.log('Big error ', error);
});
