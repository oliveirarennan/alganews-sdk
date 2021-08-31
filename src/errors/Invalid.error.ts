import CustomError, { ErrorType } from "../CustomError"
export default class InvalidError extends CustomError{
  static type = 'InvalidError'  as ErrorType
} 