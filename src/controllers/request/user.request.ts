import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateRequest {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  birthDate!: string;

  @IsNotEmpty()
  @IsString()
  timezone!: string;
}

export class UserUpdateRequest {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  birthDate!: string;

  @IsNotEmpty()
  @IsString()
  timezone!: string;
}
