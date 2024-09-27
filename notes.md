<h1>Notes for the server</h1>
The ip address is 52.7.97.46
ssh -i Aws-key.pem ubuntu@52.7.97.46
Domain name: connor-webserver-260.click
Keep the AWS server at US East (N. Virginia)
To push to server: ./deployFiles.sh -k .\Aws-key.pem -h connor-webserver-260.click -s startup
