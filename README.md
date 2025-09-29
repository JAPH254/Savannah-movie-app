🎥 Savannah Movie App

A modern movie explorer web application built with React (Vite + TypeScript), styled with TailwindCSS, and powered by Redux Toolkit for state management.
The app consumes the TMDB API
 to display trending, popular, and searchable movies, with a backend planned using Django REST Framework.

🚀 Features

🔍 Search movies in real-time

🎞️ Movie details page with overview, rating, and release date

⭐ Average ratings and vote counts

🖼️ Optimized lazy image loading with smooth fade-in

📱 Fully responsive UI

🔐 Authentication system (Register, Login, Logout) powered by Redux Toolkit

🧪 Testing with Vitest + React Testing Library

⚡ Built with Vite for lightning-fast development

🔄 CI/CD pipeline with GitHub Actions for both staging and main branches

🛠️ Tech Stack
Frontend

React
 (Vite + TypeScript)

Redux Toolkit
 for state management

React Router
 for navigation

TailwindCSS
 for styling

Vitest
 + Testing Library
 for testing

Backend (Planned / In Progress)

Django
 REST Framework

SQLite (dev) / PostgreSQL (prod)

CI/CD

GitHub Actions

Runs tests automatically on staging and main branches

Uses Vitest for frontend unit/integration tests

Backend tests (Django) will be added later

📦 Installation & Setup
1. Clone the repo
``git clone https://github.com/JAPH254/Savannah-movie-app.git
``cd savannah-movie-app

2. Backend (Django)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Runs on: http://127.0.0.1:8000/

3. Frontend (React + Vite)
cd frontend
npm install


Create a .env file in frontend/ with your TMDB API key:

VITE_TMDB_API_KEY=your_api_key_here


Run the app in development:

npm run dev


App will be available at: http://localhost:5173

Build for production:

npm run build
npm run preview

🧪 Running Tests

The project uses Vitest + React Testing Library for unit and integration tests.

Run tests once:

npx vitest


Run tests in watch mode:

npx vitest --watch

🌍 API Reference

This project uses the TMDB API.
You need to create a free account and generate an API key to use it.

Example request:

https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY

📡 Continuous Integration

GitHub Actions runs tests on every push and pull request targeting staging or main.

Frontend tests are powered by Vitest.


⚡ Built with passion for movies & clean code.