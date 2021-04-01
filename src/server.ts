import { config } from 'dotenv'

import { App } from './app'

// Controllers
import { DataController } from './controllers/api/v1/data.controller'

// Middleware
import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/not-found.middleware'
import { DataProvider } from './services/data.service'

// Get environment variables
config()

const THIRTY_MINUTES_IN_MS = 1800000

/**
 * Fetches data immediately and then
 * refreshes this data every 30 minutes.
 */
const dataProvider = new DataProvider()
dataProvider.getData()

setInterval(async () => {
  await dataProvider.getData()
}, THIRTY_MINUTES_IN_MS)

/**
 * Startup the express app.
 */
const app = new App({
  port: parseInt(process.env.PORT || '3000'),
  controllers: [new DataController()],
  middleWares: [notFoundHandler, errorHandler],
})

app.listen()
