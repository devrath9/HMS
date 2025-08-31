import jwt from 'jsonwebtoken'

const authAdmin= async(req,res,next)=>{

    try{
    const {admintoken} = req.headers

    if(!admintoken){
        return res.json({success:false, message:"Not authorised,Login again1"})
    }

    const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET)

    if(token_decode !== process.env.ADMIN_EMAIL){
        return res.json({success:false, message:"Not authorised,Login again2"})
    }

    next()

   }catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
   }
}

export default authAdmin