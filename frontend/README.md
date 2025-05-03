# 🎤  Stutter Enhancer - AI-Powered Speech Fluency Frontend


![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Overview

The Stutter Enhancer frontend is a single-page web application, developed using React and Vite, focused on user-friendliness and intuitive operation, with a modern and sleek design.

## Build and Deploy with Docker

The frontend can be easily containerized and deployed using Docker.

1.  **Build the Docker Image:**
    After cloning the repository, navigate to the root of your project and run:
    ```bash
    docker build -t frontend:<version> Stutter-enhancer/frontend
    ```
    Replace `<version>` with your desired tag.

2.  **Run the Docker Container:**
    Deploy with a command like:
    ```bash
    docker run -d -p 5173:5173 --net deployment_ainet --name frontend frontend:<version>
    ```
    Ensure the `deployment_ainet` network exists or adjust as needed. The app will be accessible at `http://localhost:5173`.


## Usage Flow

1.  **Recording:**
    * Click the microphone button to start recording.
    * Use pause/resume buttons as needed.
    * Click upload when finished.

2.  **Processing:**
    * The app sends the recording to the backend.
    * A loading state is shown during processing.
    * Transcribed text is displayed when ready.

3.  **Text Correction (Optional):**
    * Edit the transcribed text if needed.
    * Click submit to send corrections for enhancement.
4.   **Polling:**
        * The UI enteres a processing state, until the backend returns an enhanced audio.

5.  **Results:**
    * View a side-by-side comparison of original and enhanced audio.
    * Play either version with waveform visualization.
    * Download either vanilla or enhanced audio files

## Key Features

* Records audio in browser, with pause/resume functionality.
* Visualizes audio waveforms in real-time.
* Sends audio to backend API for processing.
* Handles transcription and enhancement.
* Allows editing of transcript 
* Provides a side-by-side comparison of original and enhanced audio.
* Enables download of audio files

## Technical Components

**Main Components:**

* `MicrophoneCircle`: Manages recording state and API interactions.
* `RecordingView`: Handles the recording interface with visualizer.
* `TextboxView`: Allows text correction after transcription, and displays transcript.
* `EnhancedView`: Displays comparison of original vs enhanced audio.
* `AudioPlayer`: Plays audio with waveform visualization, and playback controls.

## How to Contribute

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

### Prerequisites

Ensure you have Node.js (v14+) and npm installed on your system.

### Dev Environment Setup Steps

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd stutter-enhancer-app/frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```
    

3.  **Start the Development Server (using Vite):**

    ```bash
    npm run dev
    ```

    This command will start the **Vite** development server. You should see output similar to this:

    ```
    > frontend@0.0.0 dev
    > vite


      VITE v6.3.1  ready in 243 ms

      ➜  Local:    http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    ```

    The application will typically be accessible at the `Local` address provided by Vite (e.g., `http://localhost:5173/`).

## Technical Dependencies

The Stutter Enhancer uses the following libraries:

* `react` (v18)
* `@vitejs/plugin-react`
* `react-audio-voice-recorder`
* `react-audio-visualize`
* `file-saver`
* `react-icons`
* `react-share`

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the `LICENSE` file for complete details.
