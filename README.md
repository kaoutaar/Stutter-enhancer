# 🗣️ Stutter Enhancer - AI-Powered Speech Fluency System

An AI-powered application designed to convert raw, stuttered audio into fluent and clear speech.

---

## 📺 Demo

https://github.com/user-attachments/assets/6897d472-10ae-42ac-a5e1-4fd55f6c5d24
 
---

## ⚡ Quick start

Launch the full backend 

````bash
docker-compose -f backend/deployment/dockercompose.yml up --build
````
Make sure all the containers are fully up then run the frontend

````bash
docker build -t frontend:1.0 frontend
````

````bash
docker run -d -p 5173:5173 --net deployment_ainet --name frontend frontend:1.0
````

---
## 👨‍💻 Contributors

This project is developed and maintained by two primary contributors:

- **Frontend Developer**: [@jsbloo](https://github.com/@jsbloo) </br>
  The frontend developer was responsible for designing and implementing a user interface that seamlessly integrates with the backend system. Built with modern web technologies—including React, Node.js, TypeScript, and Vite—the frontend application emphasizes simplicity and intuitive user experience. To streamline deployment, the application is containerized using Docker.


- **Backend Developer**: [@kaoutaar](https://github.com/kaoutaar)  
  The backend developer focuses on implementing the core processing logic, including integrating AI models for Speech-to-Text (STT) and Text-to-Speech (TTS), managing database operations, and handling asynchronous tasks. The backend is built with FastAPI, Celery, and PostgreSQL, and it is containerized using Docker for easy deployment.

---

## 📚 Technical Details

For detailed information on the **backend** and **frontend** components, please refer to their respective README files:

- **[Backend README](./backend/README.md)**:  
  This file contains the technical details of the backend setup, including instructions for running the servers, setting up Docker. It also outlines the AI models used, task processing flow, and system requirements.

- **[Frontend README](./frontend/README.md)**:  
  This files serves as a concise guide for understanding, installing, using, and contributing to the Stutter Enhancer frontend application.

---
## 🪤 Pitfalls

**Some potential pitfalls to be aware of**:

* The app uses the Outetts model, which, while the only available option, is not very efficient.

* It can be buggy at times, causing occasional performance issues.

* The model also struggles with longer audio or text inputs.

---

## 📈 Future Improvements

- Integration of more advanced TTS and STT models for better performance.
- Implementation of user authentication with personalized data storage.
- Extension of API capabilities to support detailed analytics and reporting.
- Support for video processing, enabling the extraction of audio from video files.
- Frontend -> Backend authentication.
- Make frontend / api public.
- Kubernetes deployment.
- WhatsApp integration. 

---

## 🤝 Contributing

We welcome contributions to both the frontend and backend. Please fork the repository, create an issue, or submit a pull request for any improvements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

