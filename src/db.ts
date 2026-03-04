import mongoose, { connect } from "mongoose";
import {model, Schema} from "mongoose";
const connection = process.env.mongoDB;

if(!connection){
    throw new Error("MongoDB is not defined in .env");
}
mongoose.connect(connection);

const userSchema = new Schema({
    username : {type : String , unique: true},
    password : String
})
export const userModel =  model( "users", userSchema);

const contentSchema = new Schema({
    
	link: String,
	title: String,
	tags: [{ type : mongoose.Types.ObjectId , ref : "Tag"}],
    userId : {type : mongoose.Types.ObjectId , ref : "users" , required : true}   

})

export const contentModel = model("contents", contentSchema);

