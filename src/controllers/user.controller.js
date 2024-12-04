import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler( async (req, res ) => {
   //get user details from frontend

     const {fullName, email, username, password}= req.body
     console.log("email",email);

   //validation => not empty

    if (
      [fullName, email, username, password].some(() =>
      fild?.trim() === "")
    ) {
      throw new ApiError (400, "All fields are required")
    }

    //check the user already exists: username, email
    const existedUser =User.findOne({
      $or: [{ username }, { email }]
    })

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists")
    }


   //check for images, check for avatar
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if (!avatarLocalPath) {
    throw  new ApiError(400, "Avatar file is required")
   }

   //uplode them to cloudinary , check avatar
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if (!avatar){
    throw  new ApiError(400, "Avatar file is required")
   } 

   //create user object -> cheate entry in db
   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

   //remove password and refresh token fild from response
   //check for user creaction
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if (!createdUser) {
    throw new ApiError(500, "Failed to create user")
   }
   //return response

   return res.status(201).json(
    new ApiResponse(200, createdUser , "User registered Successfully")
   )

})


export {registerUser}