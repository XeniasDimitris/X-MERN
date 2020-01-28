const express = require('express');
const router = express.Router();
const verify_token = require('../middleware/chech-auth')
const AggregatedGenerationPerType_controller = require('../controllers/AggregatedGenerationPerType_controller');


/**
 * @swagger
 * /energy/api/AggregatedGenerationPerType/{AreaName}/{ProductionType}/{Resolution}/date/{YYYY-MM-DD}:
 *   get:
 *     tags:
 *       - AggregatedGenerationPerType
 *     description: Get AggregatedGenerationPerTypeValue for a particular Date for all DateTimes. If ProductionType = AllTypes then these records as a sum for every Type
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: ProductionType
 *         in: path
 *         description: The particular ProductionType or AllTypes
 *         required: true
 *         schema:
 *            type: string
 *            items:
 *              type: array
 *              default: available
 *              enum:
 *                 - Fossil Gas
 *                 - Fossil Oil
 *                 - Solar
 *                 - Wind Onshore
 *                 - AllTypes
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
 *                           - AggregatedGenerationPerType
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
 *                   ProductionType:
 *                       type: string
 *                       enum:
 *                          - Solar
 *                   ActualGenerationOutputValue:
 *                      type: number
 *                      enum:
 *                          - 2223
 *                   UpdateTimeUTC:
 *                      type: string
 *                      format: datetime
 *                      enum:
 *                           - "2018-09-04 11:16:37.0000000"
 */
router.get('/:AreaName/:ProductionType/:Resolution/date/:fulldate',verify_token,AggregatedGenerationPerType_controller.AggregatedGenerationPerType_get_YMD);


/**
 * @swagger
 * /energy/api/AggregatedGenerationPerType/{AreaName}/{ProductionType}/{Resolution}/month/{YYYY-MM}:
 *   get:
 *     tags:
 *       - AggregatedGenerationPerType
 *     description: Get AggregatedGenerationPerTypeValue aggregated by day. If ProductionType = AllTypes then these records as a sum for every Type
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: ProductionType
 *         in: path
 *         description: The particular ProductionType or AllTypes
 *         required: true
 *         schema:
 *            type: string
 *            items:
 *              type: array
 *              default: available
 *              enum:
 *                 - Fossil Gas
 *                 - Fossil Oil
 *                 - Solar
 *                 - Wind Onshore
 *                 - AllTypes
 *       - name: Resolution
 *         in: path
 *         description: The Resolution for the records ("PT60M" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: YYYY-MM
 *         in: path
 *         description:  The Month for the record ("1-2018" for the example)
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
 *                           - AggregatedGenerationPerType
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
 *                   ProductionType:
 *                       type: string
 *                       enum:
 *                          - Solar
 *                   ActualGenerationByDayOutputValue:
 *                      type: number
 *                      enum:
 *                          - 2223
 */
router.get('/:AreaName/:ProductionType/:Resolution/month/:fulldate',verify_token, AggregatedGenerationPerType_controller.AggregatedGenerationPerType_get_YM);

/**
 * @swagger
 * /energy/api/AggregatedGenerationPerType/{AreaName}/{ProductionType}/{Resolution}/year/{YYYY}:
 *   get:
 *     tags:
 *       - AggregatedGenerationPerType
 *     description: Get AggregatedGenerationPerTypeValue aggregated by month. If ProductionType = AllTypes then these records as a sum for every Type
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: ProductionType
 *         in: path
 *         description: The particular ProductionType or AllTypes
 *         required: true
 *         schema:
 *            type: string
 *            items:
 *              type: array
 *              default: available
 *              enum:
 *                 - Fossil Gas
 *                 - Fossil Oil
 *                 - Solar
 *                 - Wind Onshore
 *                 - AllTypes
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
 *                           - AggregatedGenerationPerType
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
 *                   ProductionType:
 *                       type: string
 *                       enum:
 *                          - Solar
 *                   ActualGenerationByDayOutputValue:
 *                      type: number
 *                      enum:
 *                          - 2223
 */
router.get('/:AreaName/:ProductionType/:Resolution/year/:fulldate',verify_token, AggregatedGenerationPerType_controller.AggregatedGenerationPerType_get_Y);


/**
 * @swagger
 * /energy/api/AggregatedGenerationPerType/{AreaName}/{ProductionType}/{Resolution}:
 *   get:
 *     tags:
 *       - AggregatedGenerationPerType
 *     description: Get AggregatedGenerationPerTypeValue for current Date for all DateTimes. If ProductionType = AllTypes then these records as a sum for every Type
 *     operationId: get_YMD
 *     parameters:
 *       - name: AreaName
 *         in: path
 *         description: The AreaName ("Greece" for the example)
 *         required: true
 *         schema:
 *           type: string
 *       - name: ProductionType
 *         in: path
 *         description: The particular ProductionType or AllTypes
 *         required: true
 *         schema:
 *            type: string
 *            items:
 *              type: array
 *              default: available
 *              enum:
 *                 - Fossil Gas
 *                 - Fossil Oil
 *                 - Solar
 *                 - Wind Onshore
 *                 - AllTypes
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
 *                           - AggregatedGenerationPerType
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
 *                   ProductionType:
 *                       type: string
 *                       enum:
 *                          - Solar
 *                   ActualGenerationOutputValue:
 *                      type: number
 *                      enum:
 *                          - 2223
 *                   UpdateTimeUTC:
 *                      type: string
 *                      format: datetime
 *                      enum:
 *                           - "2018-09-04 11:16:37.0000000"
 */
router.get('/:AreaName/:ProductionType/:Resolution/',verify_token, AggregatedGenerationPerType_controller.AggregatedGenerationPerType_get_);

module.exports = router;