import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";

const serverlessConfiguration: AWS = {
  service: "aws-nodejs-typescript",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    memorySize: 512,
    stage: "dev",
    profile: "personal",
    region: "ap-south-1",
    stackName: "oslash-serverless",
    deploymentPrefix: "serverless",
    deploymentBucket: {
      //   name: "com.serverless.${self:provider.region}.deploys",
      maxPreviousDeploymentArtifacts: 10,
      blockPublicAccess: true,
      skipPolicySetup: true,
      serverSideEncryption: "AES256",
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello },
};

module.exports = serverlessConfiguration;
