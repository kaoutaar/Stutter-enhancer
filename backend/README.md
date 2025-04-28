

---
# 🗣️ Stutter Enhancer - AI-Powered Speech Fluency Backend


![Docker](https://img.shields.io/badge/docker-ready-blue)
![FastAPI](https://img.shields.io/badge/fastapi-0.115.12-brightgreen)
![Celery](https://img.shields.io/badge/celery-5.5.1-green)
![PostgreSQL](https://img.shields.io/badge/postgres-14.x-blue)
![Redis](https://img.shields.io/badge/redis-7.x-red)
![MinIO](https://img.shields.io/badge/minio-object--storage-orange)
![Whisper](https://img.shields.io/badge/whisper-openai-purple)
![OutetTS](https://img.shields.io/badge/outetts-tts--engine-lightgrey)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


Welcome to the backend of **Stutter Enhancer** — an AI-powered backend system designed to transform raw, stuttered audio into fluent, clear speech.

This backend is **self-contained** and runs seamlessly via a **single Docker Compose file**. It handles user audio recordings, processes them through AI models (for Speech-to-Text and Text-to-Speech), and serves ready-to-use APIs for frontend integration.

This project brings together modern web frameworks, powerful asynchronous processing, and scalable cloud storage.

> "Enhancing fluency, empowering voices."

---

## 📦 What's Inside?

**Stutter Enhancer Backend** orchestrates several powerful components:

- **FastAPI** — lightning-fast web framework for serving APIs.
- **Celery** — executes long-running AI processing tasks asynchronously.
- **Redis** — acts as the real-time broker for task queues.
- **PostgreSQL** — relational database to persist audio metadata.
- **MinIO** — scalable object storage for raw and enhanced audio files.
- **Docker Compose** — one command to bring the entire system to life.

---



## 🏗️ Architecture Overview

User Uploads Audio ↓ FastAPI Server ↓ PostgreSQL Database ←→ Celery Queue ↓ ↓ MinIO Storage AI Models (STT, TTS) ↓ ↓ Metadata Saved Enhanced Audio Created ↓ API Ready for Frontend


* When a user submits an audio file, it's stored in MinIO and metadata is saved in PostgreSQL.

* Celery workers, coordinated by Redis, pick up background jobs to:

    * Transcribe audio (Speech-to-Text)

    * Synthesize improved fluent speech (Text-to-Speech) after confirming the transcript by the user

* The resulting enhanced audio is saved back to MinIO.

* Users can retrieve their enhanced audio easily via the provided API.

---

## 🛠️ Technology Stack

| Technology       | Why It's Used                                                            |
|------------------|---------------------------------------------------------------------------|
| **FastAPI**       | Best-in-class for async APIs, perfect for media handling                  |
| **Celery + Redis** | Handles heavy audio processing outside the request/response cycle         |
| **PostgreSQL**     | Robust storage of audio metadata, timestamps, formats                    |
| **MinIO**          | Highly scalable object storage for both raw and enhanced audio           |
| **Docker Compose** | Hassle-free environment setup for development, staging, or production    |


---

## 🧠 AI Models Used

The backend uses two models to process audio locally:

1. **[Whisper.cpp (Speech-to-Text)](https://github.com/ggerganov/whisper.cpp)**:  
   Whisper listens to your audio and generates a transcript of the spoken words.

2. **[OutetTS (Text-to-Speech)](https://github.com/OutetTS/OutetTS)**:   
   OutetTS takes the transcript along with the original voice to create a fluent, clear version of the audio. It essentially clones the original voice while improving the speech flow.

Both models work entirely within the system, so there’s no need for external services. Everything runs locally and efficiently!


---

## 📦 Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

_You **don't** need to install Python, PostgreSQL, or MinIO manually!_

> 💡 **Minimum RAM:** 7 GB  
> The integrated AI models (e.g., Whisper, TTS) are memory-intensive. A minimum of **7 GB RAM** is required for smooth operation.

---

## ⚡ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/kaoutaar/Stutter-enhancer.git
   cd backend
   ```

2. default credentials are configured in .env, you can change them.

3. Launch the full backend

    ```bash
    docker-compose -f deployment/dockercompose.yml up --build
    ```

This will spin up:

    FastAPI server (uvicorn)

    PostgreSQL database server

    MinIO server

    Celery workers

    API Documentation (Swagger UI): http://localhost:8000/docs

    MinIO Browser Console: http://localhost:9001




## 📈 Future Improvements
- use SOTA tts and stt models.

- Implement secure user authentication with individual accounts, enabling personalized data storage and access to user-specific settings and history.

- Extend APIs for detailed analytics and reporting.

- Introduce support for video processing,

---




