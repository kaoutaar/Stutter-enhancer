# Stutter Enhancer App

## Empowering Fluent Speech Through Recording and Enhancement

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The Stutter Enhancer frontend presents a single-page web application, developed using React and Vite, with a core focus on user-friendliness and intuitive operation, complemented by a modern and sleek design.


## Key Features

* **Effortless Audio Recording:** Capture your speech with integrated microphone functionality, featuring convenient pause and resume controls.
* **Real-time Audio Visualization:** Observe your sound waves dynamically during recording with a clear and responsive waveform display.
* **Intelligent Audio Processing:**
    * Seamlessly converts your recordings to the universally compatible WAV format.
    * Securely transmits audio to a backend API for advanced processing.
    * Efficiently handles both accurate transcription and sophisticated speech enhancement algorithms.
* **Intuitive Comparison Interface:** Review and analyze your original and enhanced audio recordings side-by-side for direct comparison.
* **Flexible Sharing Options:** Easily share your processed audio files or download them for personal use and further practice.

## Technical Components


**Main Components:**

* `MicrophoneCircle`: The central hub managing the recording lifecycle, including starting, pausing, stopping, and initiating API interactions.
* `RecordingView`: Presents the user interface for audio recording, incorporating the real-time waveform visualizer.
* `TextboxView`: Provides a space for users to review and correct the automatically transcribed text, allowing for enhanced processing accuracy.
* `EnhancedView`: Displays the original and enhanced audio players alongside each other, facilitating direct auditory and visual comparison.
* `AudioPlayer`: A reusable component responsible for playing audio, complete with waveform visualization for both original and enhanced tracks.

### Backend Integration

The frontend application communicates seamlessly with a backend API accessible through the `/api` proxy configured within **Vite**. This setup streamlines development by allowing the frontend to make API requests as if the backend were running on the same origin.

**Key API Interactions:**

* **Audio Submission (`/enhance_audio/`):** Handles the upload of the recorded audio for processing.
* **Transcription Status Checking (`/enhance_audio/text/{fileId}`):** Allows the frontend to query the backend for the current status of the transcription process for a specific recording identified by its `fileId`.
* **Enhanced Audio Retrieval (`/enhance_audio/audio/{fileId}`):** Enables the frontend to download the processed and enhanced audio file using its unique `fileId`.

## Installation & Setup

Get started with the Stutter Enhancer by following these simple steps

### Prerequisites

Ensure you have the following installed on your system:

* **Node.js:** Version 14 or higher is highly recommended. ([Download Node.js](https://nodejs.org/))
* **npm** or **yarn:** These are package managers for JavaScript. npm comes bundled with Node.js. ([Install yarn](https://yarnpkg.com/getting-started/install))
* **Backend API Service:** A running backend API service is required for the application to function correctly. Ensure it is accessible at `http://localhost:8000` (or update the `target` in the Vite proxy configuration accordingly).

### Installation Steps

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd stutter-enhancer-app
    ```

2.  **Install Dependencies:**
    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3.  **Start the Development Server (using Vite):**
    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn dev
    ```

    This command will start the **Vite** development server. You should see output similar to this, indicating Vite is running:

    ```
    > frontend@0.0.0 dev
    > vite


      VITE v6.3.1  ready in 243 ms

      ➜  Local:    http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    ```

    The application will typically be accessible at the `Local` address provided by Vite (e.g., `http://localhost:5173/`).

## Usage Flow

1.  **Recording:**
    * Initiate recording by clicking the prominent microphone button.
    * Utilize the pause and resume buttons to manage your recording session as needed.
    * Once you've finished speaking, click the upload button to send your recording for processing.

2.  **Processing:**
    * The application will automatically transmit your recording to the backend API (via **Vite**'s proxy during development and directly in a built production version).
    * A clear loading indicator will be displayed to show that processing is underway.
    * Once the transcription is complete, the generated text will be presented to you.

3.  **Text Correction (Optional):**
    * Review the transcribed text for accuracy.
    * Make any necessary edits or corrections to ensure the best possible enhancement results.
    * Click the submit button to send your corrected text for the final enhancement stage.

4.  **Results:**
    * Upon completion of the enhancement process, you'll see a side-by-side comparison of your original and the enhanced audio.
    * Play either version directly within the app, complete with synchronized waveform visualization.
    * Take control of your progress by sharing the enhanced audio or downloading it for offline practice.

## Technical Dependencies

The Stutter Enhancer leverages the following powerful libraries, seamlessly integrated within the **Vite** build process:

* `react` (v17+): A JavaScript library for building user interfaces.
* `@vitejs/plugin-react`: The official **Vite** plugin providing fast and reliable React support.
* `react-audio-voice-recorder`: A React component providing robust audio recording capabilities.
* `react-audio-visualize`: A React component for rendering dynamic and informative waveform visualizations of audio.
* `file-saver`: A library that facilitates saving files on the client-side.
* `react-icons`: A collection of popular icons available as React components.
* `react-share`: A set of React components for easy social sharing.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the `LICENSE` file for complete details.