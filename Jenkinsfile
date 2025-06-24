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
                    url: 'https://github.com/Personal-Project-VinhN/Playwright.git',
                    branch: 'main'
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
                // Nếu VM chưa cài lib hệ thống, bỏ comment dòng sau:
                // sh 'npx playwright install-deps || true'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def result = sh(script: 'npx playwright test --headed --reporter=html', returnStatus: true)
                    echo "Playwright exited with code: ${result}"
                }
            }
        }

    }

    post {
        always {
            script {
                def reportDir = 'playwright-report'
                if (fileExists("${reportDir}/index.html")) {
                    publishHTML([
                        reportDir: reportDir,
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report',
                        allowMissing: false,
                        keepAll: true,
                        alwaysLinkToLastBuild: true
                    ])
                } else {
                    echo "⚠️ Report HTML không tồn tại, có thể do test bị crash hoặc chưa chạy xong."
                }
            }
        }
    }
}
