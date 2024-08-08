import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bycrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect;
  try {
    const { userName, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "User Name is already taken",
        },
        { status: 400 },
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 90000).toString();
    
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User Already exist with this email",
          },
          { status: 400 },
        );
      } else {
        const hashedPassword = await bycrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 360000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bycrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        userName,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    //send verification email

    const emailResponse = await sendVerificationEmail(email, userName, verifyCode);
    console.log(emailResponse)

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 },
      );
    }
    return Response.json(
      {
        success: true,
        message: "User Register Success Fully.Please Verify Your email",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error reqistering user", error);
    return Response.json(
      {
        success: false,
        message: "Error reqistering user",
      },
      {
        status: 500,
      },
    );
  }
}
