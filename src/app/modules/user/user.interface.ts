import { Model } from 'mongoose'

export type IUser = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  photoUrl: string
  companyName: string
  address: string
}

export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
