import { compare, genSalt, hash } from "bcrypt";
// import { User } from "../models/user.model.js";
import User from "../models/user.model.js";
import {
  createSuccessResponse,
  errorResponse,
  serverErrorResponse,
  successResponse,
} from "../utils/api.response.js";
import _ from "lodash";

export const registerAsAdmin = async (req, res) => {
  try {
    let checkEmail = await User.findOne({ where: { email: req.body.email } });
    if (checkEmail) return errorResponse("Email is already registered!", res);

    let checkPhone = await User.findOne({ where: { phone: req.body.phone } });
    if (checkPhone) return errorResponse("Phone number is already registered!", res);

    let checkNationalId = await User.findOne({
      where: { nationalId: req.body.nationalId },
    });
    if (checkNationalId) return errorResponse("National ID is already registered!", res);

    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);

    let user = await User.create({
      ..._.pick(req.body, ["firstname", "lastname", "nationalId", "email", "phone"]),
      password: hashedPassword,
      role: "admin",
    });

    return createSuccessResponse(
      "User registered successfully. You can now login",
      {},
      res
    );
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const registerAsUser = async (req, res) => {
  try {
    let checkEmail = await User.findOne({ where: { email: req.body.email } });
    if (checkEmail) return errorResponse("Email is already registered!", res);

    let checkPhone = await User.findOne({ where: { phone: req.body.phone } });
    if (checkPhone) return errorResponse("Phone number is already registered!", res);

    let checkNationalId = await User.findOne({
      where: { nationalId: req.body.nationalId },
    });
    if (checkNationalId) return errorResponse("National ID is already registered!", res);

    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);

    let user = await User.create({
      ..._.pick(req.body, ["firstname", "lastname", "nationalId", "email", "phone"]),
      password: hashedPassword,
      role: "user",
    });

    return createSuccessResponse(
      "User registered successfully. You can now login",
      {},
      res
    );
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const login = async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return errorResponse("Invalid email or password!", res);

    const validPassword = await compare(req.body.password, user.password);
    if (!validPassword) return errorResponse("Invalid email or password!", res);

    const token = user.generateAuthToken();

    return successResponse("Login successful!", { access_token: token }, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};

export const getProfile = async (req, res) => {
  try {
    let user = await User.findByPk(req.user.id);
    if (!user) return errorResponse("User not found!", res);

    return successResponse("Profile", user, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};