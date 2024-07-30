# Song Dashboard Project

## Overview
This project is a full-stack application that provides a dashboard for analyzing and interacting with song data. It consists of a backend API built with Python and a frontend dashboard created with React.

## Project Structure
- `backend/`: Contains the Python backend code
- `song-dashboard/`: Houses the React frontend application

## Features
- Display song data in a paginated, sortable table
- Search functionality for finding specific songs
- Rate songs with a 5-star system
- Visualize song data with various charts:
  - Danceability scatter plot
  - Song duration histogram
  - Acousticness bar chart
  - Tempo bar chart
- Download song data as CSV

## Setup and Installation

### Backend
1. Navigate to the `backend` directory
2. Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate

3. Install dependencies:
pip install -r requirements.txt

4. Run the backend server:
uvicorn main:app --reload

### Frontend
1. Navigate to the `song-dashboard` directory
2. Install dependencies:
npm install

3. Start the development server:
npm start
