import { Erc20Detailed } from './Contracts/Erc20Detailed';
import { Bridge } from '@chainsafe/chainbridge-contracts';
import { ethers } from 'ethers';

export interface ChainbridgeSDK {
}

export type Setup = {
	provider: any;
	providerClient: 'ethers' | 'web3';
	bridgeSetup: BridgeData;
};

export type ChainbridgeBridgeSetup = {
	bridgeAddress: string;
	erc20Address: string;
	erc20HandlerAddress: string;
	erc20ResourceID: string;
	rpcURL: string;
	domainId: string;
};

export type BridgeData = {
	chain1: ChainbridgeBridgeSetup;
	chain2: ChainbridgeBridgeSetup;
};

export type Bridges = { [chain: string]: Bridge } | undefined;

export type ChainbridgeContracts = {
	[chain: string]: { bridge: Bridge; bridgeEvent: any; erc20: Erc20Detailed };
};

export type BridgeEventCallback = (fn: (...params: any) => void) => Bridge;

export type ChainbridgeEventsObject =
	| {
			[chain: string]: BridgeEventCallback;
	  }
	| undefined;

export type BridgeEvents =
	| { bridgeEvents: ChainbridgeEventsObject; proposalEvents: ChainbridgeEventsObject }
	| undefined;

export type ChainbridgeProviders =
	| {
			[chain: string]: {
				provider: ethers.providers.JsonRpcProvider;
				signer: ethers.providers.JsonRpcSigner;
			};
	  }
	| undefined;

export type ChainbridgeErc20Contracts = { [chain: string]: Erc20Detailed } | undefined;

export type Provider = ethers.providers.JsonRpcProvider | undefined;

export type Signer = ethers.providers.JsonRpcSigner | undefined;