import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Headers,
  UnauthorizedException,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { TLoginResponse } from "../../common/AuthTypes";
import { TUserRequest, TUserResponse } from "../../common/UserTypes";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Controller("api/smart")
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post("auth/login")
  async login(@Body() user: TUserRequest): Promise<TLoginResponse> {
    const userFromDB = await this._userService.getOneForName(user.username);

    let isPassEquals;

    if (userFromDB) {
      isPassEquals = await bcrypt.compare(user.password, userFromDB.password);
    } else {
      throw new BadRequestException("User does not exist!");
    }

    if (isPassEquals) {
      const token = await this._authService.generateJwtToken(
        userFromDB.id.toString(),
      );

      const userResponse: TUserResponse = {
        id: userFromDB.id,
        username: userFromDB.username,
      };

      return { user: userResponse, accessToken: token };
    } else {
      throw new BadRequestException("Invalid password!");
    }
  }

  @Get("auth/check")
  async checkAuth(
    @Headers("Authorization") authToken: string,
  ): Promise<TUserResponse> {
    try {
      const token = authToken?.split(" ")[1];

      console.log(token);

      if (!token) {
        console.log("token null");
        throw new UnauthorizedException("Unauthorized access");
      }

      console.log(process.env.JWT_SECRET);

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      console.log("decoded", decoded);

      const user = await this._userService.getOne(Number(decoded.sub));
      // res.status(200).json(user);
      console.log(user);
      return { id: user.id, username: user.username };
    } catch (error) {
      throw new UnauthorizedException("Unauthorized access");
    }
  }
}
