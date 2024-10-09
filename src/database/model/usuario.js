import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
    email:{
        type: String,
        required:true,
        trim:true,
        minLength:10,
        maxLength:100,
        unique:true,
        validate:{
            validator: (value)=>{
                return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value)
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength:8,
        maxLength:100,
        trim:true,
        validate:{
            validator:(value)=>{
                return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(value)
            }
        }
    }
})

const Usuario = mongoose.model('usuario', usuarioSchema)

export default Usuario;