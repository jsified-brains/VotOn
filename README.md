# VotOn Serverless API
Middle-tier/Service-layer for VotOn Web/Mobile app. Runs Express sevrer for developing locally. AWS CodePipeline deploys this as AWS Lambda function for DIT/SIT/Prod

# Running this project locally:
1. Run DynamoDBLocal
    - this runs on port 8000 -> http://localhost:8000/shell/
2. Run DynamoDBAdmin
    - this runs on port 8001 -> http://localhost:8001
3. Run VotOn
    - this runs on port 3000 -> http://localhost:3000

#Running DynamoDBLocal
1. exctact/unzip dynamodb_local_latest.zip to "C:\sk" 
2. cd C:\sk\dynamodb_local_latest --> this is the path where you have downloaded the DynamoDBLocal
3. java -jar ./DynamoDBLocal.jar -dbPath C:\sk\git_repos\VotOn\localDynamoDBData -sharedDb

#Running DynamoDBAdmin
1. cd "C:\sk\git_repos\VotOn\" - this is the path of the git repo
2. open cmd/powershell here
3. execute "npm run dynamoDbAdmin"

#Running VotOn Services
1. cd "C:\sk\git_repos\VotOn\" - this is the path of the git repo
2. open cmd/powershell here
3. execute "npm run build"
4. execute "npm run start"

# Available routes:
http://localhost:3000/api/v1/pollTemplates
http://localhost:3000/api/v1/pollTemplates/4
http://localhost:3000/api/v1/features
http://localhost:3000/api/v1/features/3

