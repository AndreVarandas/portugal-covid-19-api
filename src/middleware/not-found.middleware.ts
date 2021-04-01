import { NextFunction, Request, Response } from 'express'

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  response.status(404).json({ message: 'Resource not found.' })
}
