import prisma from "../db";

export const getUpdates = async(req , res) => {
    const products = await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
        },
        include:{
            Update:true
        }
    })

    const updates = products.reduce((allUpdates , product) => {
        return [...allUpdates ,...product.Update] 
    },[])

    res.json({data: updates})
}

export const getUpdate = async(req , res) =>{
    const updates = await prisma.update.findUnique({
        where:{
            id:req.params.id
        }
    })

    res.json({data: updates})
}

export const createUpdate = async (req , res) => {
    const product = await prisma.product.findUnique({
        where:{
            id:req.body.productId
        }
    })    

    if(!product){
        return res.json({message: "nope"})
    }

    const update = await prisma.update.create({
        data:req.body
    })

    res.json({data: update})
}

export const updateUpdate = async(req ,res )=>{
    const products = await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
        },
        include:{
            Update:true
        }
    })

    const updates = products.reduce((allUpdates , product)=>{
        return [...allUpdates , ...product.Update]
    } , [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        res.json({message: "No match found!"})
    }

    const update = await prisma.update.update({
        where:{
            id:req.params.id
        },
        data:req.body
    })

    res.json({data: update})
}

export const updateDelete = async(req, res)=>{
    const products = await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
        },
        include:{
            Update:true
        }
    })

    const updates = products.reduce((allUpdates , product)=>{
        return [...allUpdates , ...product.Update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        return res.json({message: "No match found!"})
    }

    const updatedelete = await prisma.update.delete({
        where:{
            id:req.params.id
        }
    })

    res.json({data: updatedelete})
}