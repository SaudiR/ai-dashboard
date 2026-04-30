#  AI Image Analysis Pipeline (AWS + React)

A full-stack, serverless AI application that analyzes images in real time using AWS cloud services and displays results in a React dashboard.

## 🚀 Live Demo
https://ai-dashboard-eta-brown.vercel.app

<img width="1138" height="684" alt="Screenshot 2026-04-29 at 19 55 52" src="https://github.com/user-attachments/assets/ad81ea72-1af3-4a5c-b064-098bbaed0a28" />


---

## 📌 Overview

This project allows users to upload images and receive AI-generated labels with confidence scores. It demonstrates how to build a scalable, event-driven system using AWS and modern frontend technologies.

---

## 🏗️ Architecture

**Flow:**

<img width="1536" height="1024" alt="Architecture" src="https://github.com/user-attachments/assets/328b2c56-18a9-4979-81e9-96850fd85bd9" />





1. User uploads image via React frontend  
2. Image is securely uploaded to AWS S3 using a pre-signed URL  
3. S3 triggers an AWS Lambda function  
4. Lambda sends the image to AWS Rekognition for analysis  
5. Labels + confidence scores are stored in DynamoDB  
6. React dashboard fetches and displays results via API Gateway  

---

## 🧰 Tech Stack

### Frontend
- React
- JavaScript
- CSS

### Backend (Serverless)
- AWS Lambda
- Amazon S3
- Amazon DynamoDB
- Amazon API Gateway

### AI / Machine Learning
- AWS Rekognition (Computer Vision)

### Deployment
- Vercel (Frontend)
- AWS Cloud (Backend)

---

## ⚙️ Features

- 📤 Secure image upload using pre-signed URLs  
- ⚡ Event-driven architecture (S3 → Lambda trigger)  
- 🧠 AI-powered image labeling with confidence scores  
- 📊 Dynamic React dashboard for visualization  
- 🗂️ Metadata storage with DynamoDB  
- 🔄 Real-time data fetching from API  

---

## 🧠 Key Learnings

- Designing scalable serverless architectures on AWS  
- Integrating AI services into full-stack applications  
- Handling real-world issues (CORS, IAM permissions, API errors)  
- Building event-driven pipelines for data processing  

---

## 🔮 Future Improvements

- Real-time updates using WebSockets instead of polling  
- Batch processing using SQS for large workloads  
- Authentication system (AWS Cognito)  
- Enhanced UI/UX and analytics dashboard  

---
