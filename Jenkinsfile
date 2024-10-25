pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh 'npm run selenium:test'
            }
        }
    }

    post {
        success {
            echo 'Tests passed. Triggering deployment...'
            // build job: 'Deploy-Job', wait: false
        }
        failure {
            echo 'Tests failed. Skipping deployment.'
        }

        always {
            // Archive the JUnit test results (even if tests fail).
            junit '**/selenium-test-results.xml'
        }
    }
}
