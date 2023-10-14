import bycrypt from 'bcrypt';

export const hashPassword=async (password)=>{
 try {
    const saltRound= 10;
    const hashedPassword = await bycrypt.hash(password,saltRound);
    return hashedPassword;
    
 } catch (error) {
    console.log(error)
    
 }
}

export const comparePassword= async (password,hashedPassword)=>{
   return  bycrypt.compare(password,hashedPassword)

}