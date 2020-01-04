const express = require('express');
const router = express.Router();
const verify_token = require('../middleware/chech-auth');
const ActualTotalLoad_controller = require('../controllers/ActualTotalLoad_controller');

/**
 * @swagger
 * /ActualTotalLoad/{AreaName}/{Resolution}/{Year}/{Month}/{Day}:
 *   get:
 *     tags:
 *       - ActualTotalLoad
 *     description: Get ActualTotalLoadValue for a particular day for all DateTimes
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
 *       - name: Year
 *         in: path
 *         description: The Year for the record ("2018" for the example)
 *         required: true
 *         schema:
 *           type: number
 *       - name: Month
 *         in: path
 *         description:  The Month for the record ("1" for the example)
 *         required: true
 *         schema:
 *           type: number
 *       - name: Day
 *         in: path
 *         required: true
 *         description: The Day for the record ("4" for the example)
 *         schema: 
 *           type: number
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
 *                           - ActualTotalLoad
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
 *                   ActualTotalLoadValue:
 *                      type: number
 *                      enum:
 *                          - 5043.38
 *                   UpdateTimeUTC:
 *                      type: string
 *                      format: datetime
 *                      enum:
 *                           - "2018-09-04 11:16:37.0000000"
 */
router.get('/:AreaName/:Resolution/:Year/:Month/:Day',verify_token, ActualTotalLoad_controller.ActualTotalLoad_get_YMD);



/**
 * @swagger
 * /ActualTotalLoad/{AreaName}/{Resolution}/{Year}/{Month}:
 *   get:
 *     tags:
 *       - ActualTotalLoad
 *     description: Get ActualTotalLoadValue aggregated by day
 *     operationId: get_YM
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
 *       - name: Year
 *         in: path
 *         description: The Year for the record ("2018" for the example)
 *         required: true
 *         schema:
 *           type: number
 *       - name: Month
 *         in: path
 *         description:  The Month for the record ("1" for the example)
 *         required: true
 *         schema:
 *           type: number
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
 *             schema:
 *               type: object
 *               properties:
 *                   Source:
 *                      type: string
 *                      enum:
 *                           - entso-e
 *                   DataSet:
 *                      type: string
 *                      enum:
 *                           - ActualTotalLoad
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
 *                   ActualTotalLoadByDayValue:
 *                      type: integer
 *                      enum:
 *                         -126713.45
 *   
 */
router.get('/:AreaName/:Resolution/:Year/:Month',verify_token, ActualTotalLoad_controller.ActualTotalLoad_get_YM);



/**
 * @swagger
 * /ActualTotalLoad/{AreaName}/{Resolution}/{Year}:
 *   get:
 *     tags:
 *       - ActualTotalLoad
 *     description: Get ActualTotalLoadValue aggregated by Year
 *     operationId: get_Y
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
 *       - name: Year
 *         in: path
 *         description: The Year for the record ("2018" for the example)
 *         required: true
 *         schema:
 *           type: number
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
 *             schema:
 *               type: object
 *               properties:
 *                   Source:
 *                      type: string
 *                      enum:
 *                           - entso-e
 *                   DataSet:
 *                      type: string
 *                      enum:
 *                           - ActualTotalLoad
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
 *                   ActualTotalLoadByMonthValue:
 *                      type: integer
 *                      enum:
 *                         -1308759.35
 *   
 */
router.get('/:AreaName/:Resolution/:Year/',verify_token, ActualTotalLoad_controller.ActualTotalLoad_get_Y);


/**
 * @swagger
 * /ActualTotalLoad/{AreaName}/{Resolution}:
 *   get:
 *     tags:
 *       - ActualTotalLoad
 *     description: Get ActualTotalLoadValue for current Date for all DateTimes
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
 *             schema:
 *               type: object
 *               properties:
 *                   Source:
 *                      type: string
 *                      enum:
 *                           - entso-e
 *                   DataSet:
 *                      type: string
 *                      enum:
 *                           - ActualTotalLoad
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
 *                   ActualTotalLoadValue:
 *                      type: number
 *                      enum:
 *                          - 5043.38
 *                   UpdateTimeUTC:
 *                      type: string
 *                      format: datetime
 *                      enum:
 *                           - "2018-09-04 11:16:37.0000000"
 */
router.get('/:AreaName/:Resolution/',verify_token, ActualTotalLoad_controller.ActualTotalLoad_get_);

module.exports = router;