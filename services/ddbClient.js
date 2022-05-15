import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const REGION = 'ap-southeast-1';

export const ddbClient = new DynamoDBClient({
    apiVersion: '2012-08-10',
    region: REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_LP_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_LP_SECRET_ACCESS_KEY
    }
})