const express = require('express');
const router = express.Router();
const verify_token = require('../middleware/chech-auth');
const ActualvsForecast_controller = require('../controllers/ActualvsForecast_controller');

/**
 * @swagger
 * /energy/api/ActualvsForecast/{AreaName}/{Resolution}/date/{YYYY-MM-DD}:
 *   get:
 *     tags:
 *       - ActualvsForecast
 *     description: Get ActualvsForecastValue for a particular day for all DateTimes
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: Resolution
 *         in: path
 *         description: The Resolution for the records ("PT60M" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: YYYY-MM-DD
 *         in: path
 *         required: true
 *         description: The Day for the record ("2018-1-4" for the example)
 *         schema: 
 *           type: string
 *       - name: X-OBSERVATORY-AUTH
 *         in: header
 *         required: true
 *         description: The access token for the API
 *         schema:
 *           type: string
 *           default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTBmNjhkMWJmYzFjNjJlYmUwMmNiMTgiLCJpYXQiOjE1NzgxNTU0MDh9.iCr-PC-RC11wKhbu4hoOyeaq7ZKa5TSSVrDQVCJyeuo"
 *       - name: format
 *         in: query
 *         description: Choose the format of returned data
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             default: available
 *             enum:
 *               - json
 *               - csv
 *     responses:
 *       '401':
 *         description: Not Authorized
 *         content: {}
 *       '402':
 *         description: Out of Quota
 *         content: {}
 *       '403':
 *         description: No data
 *         content: {}
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Successful Operation
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                   Source:
 *                      type: string
 *                      enum:
 *                           - entso-e
 *                   DataSet:
 *                      type: string
 *                      enum:
 *                           - ActualvsForecastTotalLoad
 *                   AreaName:
 *                      type: string
 *                      enum: 
 *                           - Greece
 *                   AreaTypeCode:
 *                      type: string
 *                      enum:
 *                           - CTY
 *                   Mapcode:
 *                      type: string
 *                      enum:
 *                           - GR
 *                   ResolutionCode:
 *                      type: string
 *                      enum:
 *                          - PT60M
 *                   Year:
 *                      type: integer
 *                      enum:
 *                        - 2018
 *                   Month:
 *                      type: integer
 *                      enum:
 *                        - 1
 *                   Day:
 *                      type: integer
 *                      enum:
 *                        - 4
 *                   DateTimeUTC:
 *                      type: string
 *                      format: datetime
 *                      enum:
 *                        - "2018-01-01 00:00:00.0000000"
 *                   DayAheadTotalLoadForecastValue:
 *                      type: number
 *                      enum:
 *                          - 5043.38
 *                   ActualTotalLoadValue:
 *                      type: number
 *                      enum:
 *                          - 5045
 */
router.get('/:AreaName/:Resolution/date/:fulldate',verify_token, ActualvsForecast_controller.ActualvsForecast_get_YMD);


/**
 * @swagger
 * /energy/api/ActualvsForecast/{AreaName}/{Resolution}/month/{YYYY-MM}:
 *   get:
 *     tags:
 *       - ActualvsForecast
 *     description: Get ActualvsForecastValue aggregated by day
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: Resolution
 *         in: path
 *         description: The Resolution for the records ("PT60M" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: YYYY-MM
 *         in: path
 *         description:  The Month for the record ("2018-1" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: X-OBSERVATORY-AUTH
 *         in: header
 *         required: true
 *         description: The access token for the API
 *         schema:
 *           type: string
 *           default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTBmNjhkMWJmYzFjNjJlYmUwMmNiMTgiLCJpYXQiOjE1NzgxNTU0MDh9.iCr-PC-RC11wKhbu4hoOyeaq7ZKa5TSSVrDQVCJyeuo"
 *       - name: format
 *         in: query
 *         description: Choose the format of returned data
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             default: available
 *             enum:
 *               - json
 *               - csv
 *     responses:
 *       '401':
 *         description: Not Authorized
 *         content: {}
 *       '402':
 *         description: Out of Quota
 *         content: {}
 *       '403':
 *         description: No data
 *         content: {}
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Successful Operation
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                   Source:
 *                      type: string
 *                      enum:
 *                           - entso-e
 *                   DataSet:
 *                      type: string
 *                      enum:
 *                           - ActualvsForecastTotalLoad
 *                   AreaName:
 *                      type: string
 *                      enum: 
 *                           - Greece
 *                   AreaTypeCode:
 *                      type: string
 *                      enum:
 *                           - CTY
 *                   Mapcode:
 *                      type: string
 *                      enum:
 *                           - GR
 *                   ResolutionCode:
 *                      type: string
 *                      enum:
 *                          - PT60M
 *                   Year:
 *                      type: integer
 *                      enum:
 *                        - 2018
 *                   Month:
 *                      type: integer
 *                      enum:
 *                        - 1
 *                   Day:
 *                      type: integer
 *                      enum:
 *                        - 4
 *                   DayAheadTotalLoadForecastByDayValue:
 *                      type: number
 *                      enum:
 *                          - 5043.38
 *                   ActualTotalLoadByDayValue:
 *                      type: number
 *                      enum:
 *                          - 5045
 */
router.get('/:AreaName/:Resolution/month/:fulldate',verify_token, ActualvsForecast_controller.ActualvsForecast_get_YM);


/**
 * @swagger
 * /energy/api/ActualvsForecast/{AreaName}/{Resolution}/year/{YYYY}:
 *   get:
 *     tags:
 *       - ActualvsForecast
 *     description: Get ActualvsForecastValue aggregated by month
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: Resolution
 *         in: path
 *         description: The Resolution for the records ("PT60M" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: YYYY
 *         in: path
 *         description: The Year for the record ("2018" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: X-OBSERVATORY-AUTH
 *         in: header
 *         required: true
 *         description: The access token for the API
 *         schema:
 *           type: string
 *           default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTBmNjhkMWJmYzFjNjJlYmUwMmNiMTgiLCJpYXQiOjE1NzgxNTU0MDh9.iCr-PC-RC11wKhbu4hoOyeaq7ZKa5TSSVrDQVCJyeuo"
 *       - name: format
 *         in: query
 *         description: Choose the format of returned data
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             default: available
 *             enum:
 *               - json
 *               - csv
 *     responses:
 *       '401':
 *         description: Not Authorized
 *         content: {}
 *       '402':
 *         description: Out of Quota
 *         content: {}
 *       '403':
 *         description: No data
 *         content: {}
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Successful Operation
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                   Source:
 *                      type: string
 *                      enum:
 *                           - entso-e
 *                   DataSet:
 *                      type: string
 *                      enum:
 *                           - ActualvsForecastTotalLoad
 *                   AreaName:
 *                      type: string
 *                      enum: 
 *                           - Greece
 *                   AreaTypeCode:
 *                      type: string
 *                      enum:
 *                           - CTY
 *                   Mapcode:
 *                      type: string
 *                      enum:
 *                           - GR
 *                   ResolutionCode:
 *                      type: string
 *                      enum:
 *                          - PT60M
 *                   Year:
 *                      type: integer
 *                      enum:
 *                        - 2018
 *                   Month:
 *                      type: integer
 *                      enum:
 *                        - 1
 *                   DayAheadTotalLoadForecastByMonthValue:
 *                      type: number
 *                      enum:
 *                          - 5043.38
 *                   ActualTotalLoadbyMonthValue:
 *                      type: number
 *                      enum:
 *                          - 5045
 */
router.get('/:AreaName/:Resolution/year/:fulldate',verify_token, ActualvsForecast_controller.ActualvsForecast_get_Y);


/**
 * @swagger
 * /energy/api/ActualvsForecast/{AreaName}/{Resolution}:
 *   get:
 *     tags:
 *       - ActualvsForecast
 *     description: Get ActualvsForecastValue for the current date for all DateTimes
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: Resolution
 *         in: path
 *         description: The Resolution for the records ("PT60M" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: X-OBSERVATORY-AUTH
 *         in: header
 *         required: true
 *         description: The access token for the API
 *         schema:
 *           type: string
 *           default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTBmNjhkMWJmYzFjNjJlYmUwMmNiMTgiLCJpYXQiOjE1NzgxNTU0MDh9.iCr-PC-RC11wKhbu4hoOyeaq7ZKa5TSSVrDQVCJyeuo"
 *       - name: format
 *         in: query
 *         description: Choose the format of returned data
 *         style: form
 *         explode: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             default: available
 *             enum:
 *               - json
 *               - csv
 *     responses:
 *       '401':
 *         description: Not Authorized
 *         content: {}
 *       '402':
 *         description: Out of Quota
 *         content: {}
 *       '403':
 *         description: No data
 *         content: {}
 *       '400':
 *         description: Bad request
 *       '200':
 *         description: Successful Operation
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                   Source:
 *                      type: string
 *                      enum:
 *                           - entso-e
 *                   DataSet:
 *                      type: string
 *                      enum:
 *                           - ActualvsForecastTotalLoad
 *                   AreaName:
 *                      type: string
 *                      enum: 
 *                           - Greece
 *                   AreaTypeCode:
 *                      type: string
 *                      enum:
 *                           - CTY
 *                   Mapcode:
 *                      type: string
 *                      enum:
 *                           - GR
 *                   ResolutionCode:
 *                      type: string
 *                      enum:
 *                          - PT60M
 *                   Year:
 *                      type: integer
 *                      enum:
 *                        - 2018
 *                   Month:
 *                      type: integer
 *                      enum:
 *                        - 1
 *                   Day:
 *                      type: integer
 *                      enum:
 *                        - 4
 *                   DateTimeUTC:
 *                      type: string
 *                      format: datetime
 *                      enum:
 *                        - "2018-01-01 00:00:00.0000000"
 *                   DayAheadTotalLoadForecastValue:
 *                      type: number
 *                      enum:
 *                          - 5043.38
 *                   ActualTotalLoadValue:
 *                      type: number
 *                      enum:
 *                          - 5045
 */
router.get('/:AreaName/:Resolution',verify_token, ActualvsForecast_controller.ActualvsForecast_get_);

module.exports = router;