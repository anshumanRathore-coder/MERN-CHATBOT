import {body,ValidationChain,validationResult} from 'express-validator'
import {Request,Response,NextFunction} from "express"

export const validate=(validations:ValidationChain[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            let result=await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        let errors=validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(404).json({message:"Some error occures",error:errors});
    }
}
export const signupValidator=[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").isLength({min:6}).withMessage("Password contain atleast 6 characters")
]

export const loginValidator=[
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").isLength({min:6}).withMessage("Password contain atleast 6 characters")
]

export const messageValidator=[
    body("message").notEmpty().withMessage("Message is required"),
]
