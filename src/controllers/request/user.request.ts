import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateRequest {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;
}
