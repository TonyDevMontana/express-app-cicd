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
        stage("EC2 Deploy") {
            steps {
                sh 'docker run -d -p 3000:3000 714032487947.dkr.ecr.us-east-1.amazonaws.com/lpu/class:prod-${BUILD_NUMBER}'
            }
        }
        stage('Health Check') {
            steps {
                script {
                def url = "http://localhost:3000/"
                sh """
                    set -e
                    for i in {1..10}; do
                    echo "Health probe #\$i: ${url}"
                    code=\$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "${url}") || true
                    if [ "\$code" = "200" ]; then
                        echo "✅ Healthy (200)."
                        exit 0
                    fi
                    sleep 3
                    done
                    echo "❌ Health check failed."
                    exit 1
                """
                }
            }
        }
    }
}