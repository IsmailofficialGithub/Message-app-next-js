import { usernameValidation } from "@/schemas/signUpSchema";
import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import UserModel from "@/models/User";
const usernameQuerySchema = z.object({
  username: usernameValidation,
});


//funtion
export async function GET(request: Request) {
  await dbConnect;//db connect


  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };//getting params from url


    //validate with zod
    const result = usernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErros = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: usernameErros?.length > 0 ? usernameErros.join(",") : "Invalid query parameters",
        },
        {
          status: 400,
        },
      );
    }
    const { username } = result.data;
    // checking from db
    const existingVerifiedUser = await UserModel.findOne({
      userName:username,
      isVerified:true
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        },
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is Unique",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error in checking username");
    return Response.json(
      {
        success: false,
        message: "Error in checking username",
      },
      {
        status: 500,
      },
    );
  }
}
