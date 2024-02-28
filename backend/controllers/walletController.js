import { getUserWalletTransaction } from "../database/repository/walletDBInteract.js"


export const getTransaction = async (req,res) =>{
    const id = req.params.id
    try {
        const wallet = await getUserWalletTransaction(id)
        res.status(200).json({
            success: true,
            message: "got transation details",
            data: wallet,
        });
    } catch (error) {
        res.status(500).json({success: false, message: "fetching transaction details failed"})
    }
}