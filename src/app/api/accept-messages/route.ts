import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

          // updating  status api
export async function POST(request: Request) {
  await dbConnect;
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User; // error handle later

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 },
    );
  }
  
  const userId = user._id;
  const {acceptMessage}  = await request.json();
  
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessage },
      { new: true },
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user status to accept messages",
        },
        { status: 401 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "User status To accept messages Updated successfully",
        acceptMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("failed to update user status to accept messages");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages",
      },
      { status: 500 },
    );
  }
}

               // getting status api
export async function GET(request: Request) {
  await dbConnect;
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User; // error handle later

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 },
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in getting message Acceptance status");
    return Response.json(
      {
        success: false,
        message: "Error in getting message Acceptance status",
      },
      { status: 500 },
    );
  }
}
