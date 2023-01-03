/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require("aws-sdk");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

// TODO: Should move this over to Redis
const simpleCache = {};

// Dev only
let tableName = "Assignment-mrhsgmtbovbq5ehlwoxujhygpy";

if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Check if user is enrolled
app.get("/enrollments/enrollmentCheck", async function (req, res) {
  if (simpleCache[`${req.query.userId}${req.query.courseSlug}`]) {
    res.status(200).json({ fromCache: true });
  }

  const params = {
    TableName: tableName,
    FilterExpression: "user_id = :userId AND course_slug = :courseSlug",
    ExpressionAttributeValues: {
      ":userId": req.query.userId,
      ":courseSlug": req.query.courseSlug,
    },
  };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "Could not load items: " + err.message });
    } else {
      if (data.Count === 0) {
        res.status(404).end();
      } else {
        simpleCache[`${req.query.userId}${req.query.courseSlug}`] = true;
        res.status(200).json({ fromCache: false });
      }
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
