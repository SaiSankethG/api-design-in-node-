import { create } from "domain";
import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async(req, res) =>{
    const user = await prisma.user.create({
        data:{
            name: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })  
    const token = createJWT(user);
    res.json(token);
}

export const signin = async(req, res) =>{
    const user = await prisma.user.findUnique({
        where:{name: req.body.username},
    })

    const isValid = await comparePassword(req.body.password , user.password)

    if(!isValid){
        res.status(401)
        res.json({message:"INVALID!"})
        return
    }
    const token = createJWT(user)
    res.json(token)
}