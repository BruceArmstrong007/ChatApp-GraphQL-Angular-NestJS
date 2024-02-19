import { Injectable } from '@nestjs/common';
import { CreateAuthInput, LoginAuthInput } from './dto/login-auth.input';

@Injectable()
export class AuthService {
  // create(createAuthInput: CreateAuthInput) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }

  async login(loginAuthInput: LoginAuthInput) {
    console.log(loginAuthInput);
    return await loginAuthInput;
    // if (!user?.verified) {
    //   throw new BadRequestException("User's email is not verified.");
    // }
    // const payload = {
    //   userID: user._id,
    //   username: user.username,
    //   email: user.email,
    //   verified: user.verified,
    // };
    // const { accessToken, refreshToken } =
    //   await this.authRepository.generateJWT(payload);

    // const expires = Number(this.config.get('COOKIE_EXPIRATION'));
    // response.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: expires
    // });
    // response.cookie('isLoggedIn', true, {
    //   sameSite: 'none',
    //   secure: true,
    //   maxAge: expires
    // });

    // response.status(200).json({ accessToken });
  }
}
