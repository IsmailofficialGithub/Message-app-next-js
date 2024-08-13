import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { Message } from "@/models/User";


export async function POST(request: Request) {
  await dbConnect;

  const { userName, content } = await request.json();
  console.log(userName)
  try {
    const user = await UserModel.findOne({
     $or:[
          {userName:userName},
          {email:userName}
     ]
    });
    console.log('user===>>>',user)
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 },
      );
    }
    // is user accepting messages
    if (!user?.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is Not accepting the Messages",
        },
        { status: 200 },
      );
    }
    const newMessage={content,createAt:new Date()};
    user.messages.push(newMessage as Message)
    await user.save()
    return Response.json(
     {
       success: true,
       message: "Message send Successfully",
     },
     { status: 200 },
   );
  } catch (error) {
     console.log(error)
     return Response.json(
          {
            success: false,
            message: "An unexpected error occured",
          },
          { status: 500 },
        );
  }
}
