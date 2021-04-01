import cors from 'cors'
import express, { Application } from 'express'
import session from 'express-session'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { createStream } from 'rotating-file-stream'

export class App {
  public app: Application
  public port: number

  constructor(appInit: {
    port: number
    middleWares: unknown
    controllers: unknown
  }) {
    this.app = express()
    this.port = appInit.port

    this.config()
    this.routes(appInit.controllers)
    this.middlewares(appInit.middleWares)
  }

  private middlewares(middleWares: any): void {
    middleWares.forEach((middleWare: any) => {
      this.app.use(middleWare)
    })
  }

  private routes(controllers: any): void {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router)
    })
  }

  private config(): void {
    // create a rotating write stream
    const accessLogStream = createStream('access.log', {
      interval: '1d', // rotate daily
      path: path.join(__dirname, '..', 'logs'),
      compress: 'gzip', // compress rotated files
    })

    // Configure session object
    const sess = {
      secret: process.env.SECRET || 'le random secret',
      cookie: { secure: true },
      resave: true,
      saveUninitialized: true,
    }

    if (process.env.NODE_ENV === 'production') {
      this.app.set('trust proxy', 1) // trust first proxy
    }

    this.app.use(session(sess))
    this.app.use(morgan('combined', { stream: accessLogStream }))
    this.app.use(helmet())
    this.app.use(cors())
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}
