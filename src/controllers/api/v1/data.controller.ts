import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'

import { IControllerBase } from '../../../interfaces/IControllerBase.interface'
import { JSON_FILE_PATH } from '../../../utils/constants'

export class DataController implements IControllerBase {
  public path = '/'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get('/api/v1/data', this.all)
    this.router.get('/api/v1/data/last', this.last)
    this.router.get('/api/v1/data/last/:days', this.lastDays)
    this.router.get('/api/v1/data/update', this.update)
  }

  private async readJsonData(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(JSON_FILE_PATH, 'utf8', (onReadFileError, data) => {
        if (onReadFileError)
          reject(
            new Error(
              'DataController::readJsonData() -> Unable to read the file.',
            ),
          )
        resolve(JSON.parse(data))
      })
    })
  }

  // Routes definition
  all = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const data = await this.readJsonData()

    res.status(200).json(data)
  }

  last = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const data = await this.readJsonData()

    res.status(200).json(data[data.length - 1])
  }

  lastDays = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const days = parseInt(req.params.days, 10)
    const data = await this.readJsonData()
    const results = data.slice(data.length - days)

    res.status(200).json(results)
  }

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const data = await this.readJsonData()

    const yesterday = data[data.length - 2]
    const today = data[data.length - 1]

    const info: Record<string, unknown> = {}
    for (const entry in today) {
      if (!Object.prototype.hasOwnProperty.call(today, entry)) {
        continue
      }

      const result = today[entry] - yesterday[entry]
      if (!isNaN(result)) {
        info[entry] = result
      }
    }

    res.status(200).json(info)
  }
}
