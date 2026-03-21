import mongoose from "mongoose"

const {Schema,model,models} = mongoose

const userSchema = new Schema(
    {
        userName:{
            type:String,
            required:true
        },
          email:{
            type:String,
            required:true,
            toLower:true,
            unique:true
        },
          password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["User","Admin"],
            default:"User"
        }
    },
    {
        timestamps:true
    }
)

const User = models.User || model("User",userSchema)

export default User