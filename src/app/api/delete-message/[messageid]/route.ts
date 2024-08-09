import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
  const messageId = params.messageid;
  console.log('message Id ::>>',messageId)
  await dbConnect;
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User; // error handle later

//   if (!session || !session.user) {
//     return Response.json(
//       {
//         success: false,
//         message: "Not Authenticated",
//       },
//       { status: 401 },
//     );
//   }

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } },
    );

    if (updatedResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message Not found or already deleted",
        },
        { status: 404 },
      );
    }
    return Response.json(
      {
        success: false,
        message: "Message Deleted SuccessFully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in deleting message",
      },
      { status: 500 },
    );
  }
}
