import prisma from "../db";

export const getProducts = async (req , res)=>{
    const user = await prisma.user.findUnique({
         where:{
            id:req.user.id
         },
         include:{
            products:true
         }
    })

    res.json({data: user.products})
}

export const getProduct = async(req ,res) =>{
    const product = await prisma.product.findFirst({
        where:{
            id:req.params.id,
            belongsToId:req.user.id
        }
    })

    res.json({data: product})
}

export const createProduct = async(req , res) => {
    const product = await prisma.product.create({
        data:{
            name:req.body.name,
            belongsToId:req.user.id
        }
    })
    res.json({data: product})
}

export const updateProduct = async(req, res) =>{
    const update = await prisma.product.update({
        data:{
            name:req.body.name
        },
        where:{
            id: req.params.id,
            belongsToId:req.body.id
        }
    });
    
    res.json({data: update})
}

export const deleteProduct = async(req ,res) =>{
    const deleted = await prisma.product.delete({
        where:{
            id:req.params.id,
            belongsToId:req.user.id 
        }
    })

    res.json({data: deleted})
}