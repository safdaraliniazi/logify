pipeline {
  agent any

  environment {
    BACKEND_DIR = 'backend'
    FRONTEND_DIR = 'frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test Backend') {
      steps {
        dir("${BACKEND_DIR}") {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }

    stage('Install & Test Frontend') {
      steps {
        dir("${FRONTEND_DIR}") {
          sh 'npm install'
          // Frontend testing can be added later
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker build -t logify-backend ./backend'
        sh 'docker build -t logify-frontend ./frontend'
      }
    }
  }
}
