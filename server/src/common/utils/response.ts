import type { Response } from 'express'

export const sendResponse = (res: Response, status: number, message: string, data?: unknown) => {
  return res.status(status).json({ status, message, data })
}


