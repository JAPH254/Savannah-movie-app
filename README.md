# 🎥 Savannah Movie App

A modern **movie explorer web application** built with **React (Vite + TypeScript)**, styled with **TailwindCSS**, and powered by **Redux Toolkit** for state management.  
The app consumes the [TMDB API](https://www.themoviedb.org/) to display trending, popular, and searchable movies.

---

## 🚀 Features
- 🔍 **Search movies** in real-time
- 🎞️ **Movie details page** with overview, rating, and release date
- ⭐ **Average ratings and vote counts**
- 🖼️ Optimized **lazy image loading** with smooth fade-in
- 📱 Fully **responsive UI**
- 🔐 Authentication system (Register, Login, Logout)
- ⚡ Built with **Vite** for lightning-fast development

---

## 🛠️ Tech Stack
- **Frontend**
  - [React](https://reactjs.org/) (Vite + TypeScript)
  - [Redux Toolkit](https://redux-toolkit.js.org/) for state management
  - [React Router](https://reactrouter.com/) for navigation
  - [TailwindCSS](https://tailwindcss.com/) for styling
  - [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for testing

- **Backend (Planned)**
  - [Django](https://www.djangoproject.com/) REST Framework
  - SQLite / PostgreSQL

---

## 📦 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/JAPH254/Savannah-movie-app.git

   ```
cd savannah-movie-app/backend

pip install -r requirements.txt

python manage.py runserver

cd savannah-movie-app/frontend
   
Install dependencies

npm install


Set up environment variables

Run the app in development

npm run dev


App will be available at http://localhost:5173

Build for production

npm run build


Preview production build




npm run preview

🧪 Running Tests

The project uses Vitest + React Testing Library.

npm run test


Run in watch mode:

npm run test:watch

🌍 API Reference

This project uses the TMDB API
.
You need to create a free account and generate an API key to use it.

Example request:

https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY