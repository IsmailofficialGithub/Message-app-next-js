import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export async function PUT(request: Request) {
  dbConnect;

  try {
    const { username, code } = await request.json();
    const gettingcode={
     newcode:code
    }
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ userName: decodedUsername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 },
      );
    }

    
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified Successfully",
        },
        { status: 200 },
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Code is expired .Please again signUp to get New code",
        },
        { status: 400 },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        { status: 400 },
      );
    }

    return Response.json({
      success: true,
      message: "testing",
      user,
    });
  } catch (error) {
    console.error("Error in checking code", error);
    return Response.json(
      {
        success: false,
        message: "Error in checking code ",
        error,
      },
      { status: 500 },
    );
  }
}
