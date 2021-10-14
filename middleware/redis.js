/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const redis = require("redis");
const client = redis.createClient();

class Redis {
   redis_port = (req, res, next) => {
     client.get("getAll", (error, redis_data) => {
       if (error) {
         throw error;
       } else if (redis_data) {
         console.log("connected");
         res.status(200).send({
           redis_data: JSON.parse(redis_data),
           message: "getNotes successfully retrieved",
           success: true
         });
       } else {
         next();
       }
     });
   }

   redis_Label = (req, res, next) => {
     client.get("getLabel", (error, redis_data) => {
       if (error) {
         throw error;
       } else if (redis_data) {
         console.log("connected");
         res.status(200).send({
           redis_Label: JSON.parse(redis_data),
           message: "getNotes successfully retrieved",
           success: true
         });
       } else {
         next();
       }
     });
   }

   setData = (key, time, redis_data) => {
     client.setex(key, time, redis_data);
   };
}

module.exports = new Redis();
