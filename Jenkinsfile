pipeline {
    agent any
    stages {
        stage("checkout") {
            steps {
                checkout scm
            }
        }
        stage("Docker Build") {
            steps {
                sh 'docker build -t 714032487947.dkr.ecr.us-east-1.amazonaws.com/lpu/class:prod-${BUILD_NUMBER} .'
            }
        }
        stage("ECR Push") {
            steps {
                withAWS(credentials: 'aws-creds', region: 'us-east-1') {
                    sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 714032487947.dkr.ecr.us-east-1.amazonaws.com'
                    sh 'docker push 714032487947.dkr.ecr.us-east-1.amazonaws.com/lpu/class:prod-${BUILD_NUMBER}'
                }
                
            }
        }
    }
}