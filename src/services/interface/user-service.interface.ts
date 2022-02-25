export interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  birthDate: Date | string;
  timezone: string;
}

export interface IUpdateUserDTO {
  firstName: string;
  lastName: string;
  birthDate: Date | string;
  timezone: string;
}
