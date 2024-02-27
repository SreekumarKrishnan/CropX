import Wallet from '../models/walletSchema.js'



export const findWalletById = async(id)=>{
    try {
        const wallet = await Wallet.findOne({userId:id}).sort({createdAt:-1}).exec()
        return wallet
    } catch (error) {
        console.log(error);
    }
}

export const refundTowallet = async(data,existingAmount)=>{

    try {
        const wallet = new Wallet({
            userId : data.user._id,
            transactionType : "credit",
            cancelledBy : data.isCancelledBy,
            amount : data.specialist.fee,
            currentWalletAmount : existingAmount+data.specialist.fee
        })
        await wallet.save()
    } catch (error) {
        console.log(error);
    }
}