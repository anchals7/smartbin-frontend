# Smart Bin - Frontend (React + Vite)

## Overview
This is the React-based frontend for the Smart Bin project. It provides a simple UI to capture an object using the webcam, send it to the backend API, and display the predicted trash category.

## Features
- Webcam activation and live preview
- Image capture and conversion to Base64
- API integration with FastAPI backend for classification
- Responsive UI with styled components

## Tech Stack
- React (Vite)
- HTML5 Video API
- JavaScript (ES6), CSS
- Fetch API for backend communication

## How It Works
1. User clicks "Turn Camera On" -> webcam stream starts
2. User clicks "Capture" -> frame is drawn to a hidden canvas and converted to an image
3. The image is sent as a POST request to the backend
4. Backend responds with predicted class -> UI updates classification
