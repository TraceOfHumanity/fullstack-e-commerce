import Joi from "joi";

import connectToDB from "@/database";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export const POST = async (req) => {
  await connectToDB();

  const { name, email, password, role } = req.json();

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    console.log("err1", error);
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  } else {
    const hashPassword = await hash(password, 12);

    const newlyCreatedUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    if (newlyCreatedUser) {
      return NextResponse.json({
        success: true,
        message: "Account created successfully.",
      });
    }
  }

  try {
    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User is already exists. Please try with different email.",
      });
    }
  } catch (error) {
    console.log("Error in creating user", error);
    return NextResponse.json({
      success: false,
      message: ` Something went wrong please try again later`,
    });
  }
};
