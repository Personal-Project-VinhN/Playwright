pipeline {
    agent any
    tools {
        nodejs 'NodeJS 24'
    }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = './ms-playwright'
    }

    stages {
        stage('Clone Private Repo') {
            steps {
                git credentialsId: 'github-token',
                    url: 'https://github.com/Personal-Project-VinhN/Playwright.git'
            }
        }

        stage('Verify Node & Git') {
            steps {
                sh 'node -v && npm -v && git --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Generate HTML Report') {
            steps {
                sh 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
