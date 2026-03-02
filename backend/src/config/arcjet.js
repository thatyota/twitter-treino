import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";
import { ENV } from "./env.js"; 


//inicialize  Arcjet with security rules
export const aj = arcjet({
    Key: ENV.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // shield protects your app from common attacks (Sql Injection, XSS, CSRF attacks) 
        shield({ mode: "LIVE"}),

        //bot detection - block all bots expect search engines
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),


        // rate limiting with token bucket algorithm 
         tokenBucketU({
            mode: "LIVE",
            refillRate:10, // tokens added per interval
            interval: 10, // interval  in seconds  (10 seconds)
            capacity: 15, // maximum tokens in bucket
         }),
    ],

});