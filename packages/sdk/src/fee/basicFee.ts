import { BasicFeeHandler__factory as BasicFeeHandler } from '@chainsafe/chainbridge-contracts'
import { ethers } from 'ethers'
import { FeeDataResult } from 'types'
import { createERCDepositData } from '../utils/helpers'

export const calculateBasicfee = async ({
  basicFeeHandlerAddress,
  provider,
  sender,
  fromDomainID,
  toDomainID,
  resourceID,
  tokenAmount,
  recipientAddress
}: {
  basicFeeHandlerAddress: string;
  provider: ethers.providers.Provider;
  sender: string;
  fromDomainID: string;
  toDomainID: string;
  resourceID: string;
  tokenAmount: number;
  recipientAddress: string;
}

): Promise<FeeDataResult | Error> => {
  const depositData = createERCDepositData(tokenAmount, 20, recipientAddress)
  // WHY 0X00 AND NOT 0X0?
  const feeData = "0x00"
  const BasicFeeHandlerInstance = BasicFeeHandler.connect(
    basicFeeHandlerAddress,
    provider
  )
  const _fee = await BasicFeeHandlerInstance._fee()
  try {
    const calculatedFee = await BasicFeeHandlerInstance.calculateFee(
      sender,
      fromDomainID,
      toDomainID,
      resourceID,
      depositData,
      feeData
    )

    const [ fee, address ] = calculatedFee
    return {
      calculatedRate: ethers.utils.formatUnits(fee),
      erc20TokenAddress: address,
      feeData: fee.toHexString()
    }
  } catch(error){
    console.error(error)
    return Promise.reject(new Error("Invalidad basic fee response"))
  }


}
