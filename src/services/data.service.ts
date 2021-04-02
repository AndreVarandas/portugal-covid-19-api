import { camelCase } from 'camel-case'
import fs from 'fs'
import https from 'https'
import Papa, { ParseConfig, ParseError } from 'papaparse'

import { CSV_FILE_PATH, DATA_PATH, JSON_FILE_PATH } from '../utils/constants'

/**
 * Class that is responsible for downloading, updating and parsing the csv data
 * and saving it into a valid JSON file.
 */
export class DataProvider {
  /**
   * Grabs the existing CSV file and creates a new
   * JSON file with it's contents.
   */
  private parseCsvFile(): void {
    const file = fs.createReadStream(CSV_FILE_PATH)
    const papaConfig: ParseConfig<unknown> = {
      header: true,
      complete: ({ data }) => {
        // Convert data object from snake case to camel
        data.forEach((element: any) => {
          for (const [key, value] of Object.entries(element)) {
            if (camelCase(key) !== key)
              delete Object.assign(element, { [camelCase(key)]: value })[key]
          }
        })

        // Write the new data to a JSON file
        fs.writeFile(JSON_FILE_PATH, JSON.stringify(data), (err) => {
          if (err) return console.error(err)
          console.log(`File wrote to ${JSON_FILE_PATH}`)
        })
      },
      error: (error: ParseError) => console.error(error),
    }

    Papa.parse(file, papaConfig)
  }

  private async updateCsvFile(onUpdateCsvFileComplete: any): Promise<void> {
    const DATA_BASE_URL =
      'https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv'
    const file = fs.createWriteStream(CSV_FILE_PATH, { flags: 'w' })

    https.get(DATA_BASE_URL, function (response) {
      response.pipe(file)
      file.on('error', () => {
        file.close()
        console.error(
          'DataProvider::UpdateCsvFile() -> Could not save csv file.',
        )
      })
      file.on('finish', () => {
        file.close()
        onUpdateCsvFileComplete()
      })
    })
  }

  /**
   * Creates the folder to hold the data files.
   *
   * @returns Promise
   */
  private async createDatFolderIfNotExists(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.access(DATA_PATH, (onAccessError) => {
        if (onAccessError?.code === 'ENOENT') {
          fs.mkdir(DATA_PATH, { recursive: true }, (error) => {
            if (error) reject(error)
            resolve(true)
          })
        } else {
          resolve(true)
        }
      })
    })
  }

  async getData(): Promise<void> {
    try {
      await this.createDatFolderIfNotExists()
      await this.updateCsvFile(this.parseCsvFile)
    } catch (error) {
      console.error(error)
    }
  }
}
