# 🎬 CineStack | Advanced Movie Dashboard

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

CineStack is a high-performance, minimalist movie management dashboard. Built with a "Clean UI" philosophy, it demonstrates advanced React state management patterns, persistent storage, and highly optimized rendering.



## 🌟 Key Features

* **Elite Minimalist UI:** A full-window, responsive dashboard designed for clarity and focus.
* **Intelligent Search & Filter:** Instant real-time filtering by title or viewing status using optimized memoization.
* **Star Rating System:** A custom-built 5-star rating component for personalized collection tracking.
* **Progress Analytics:** A visual completion bar that tracks your "Watched" percentage in real-time.
* **Theme Engine:** Deeply integrated Light/Dark mode support using React Context API.
* **Zero-Loss Persistence:** Integrated with `localStorage` to ensure your collection is saved across sessions.

## 🛠️ Technical Implementation (The Hooks)

This project was built to showcase mastery of React's core and advanced hooks:

* **`useReducer`**: Manages complex state transitions for adding, rating, and removing movies.
* **`useContext`**: Powers the global theme engine for seamless UI switching.
* **`useMemo`**: Used for high-performance calculations of completion stats and filtered search results.
* **`useCallback`**: Memoizes event handlers to prevent unnecessary child component re-renders.
* **`useRef`**: Handles automatic focus of the input field on application mount for better UX.

## 🚀 Installation & Setup

1. **Clone the Project**
   ```bash
   git clone [https://github.com/Ajiththika/Movie_Tracker]

2. **Navigate to the Project Directory**
   ```bash
    cd cinestack

3. **Install Dependencies**
    ```bash
    npm install

4. **Launch Development Server**
    ```bash
    npm run dev


##  Project Structure

src/
 ├── context/          # ThemeContext for global state
 ├── hooks/            # Custom logic and reducers
 ├── App.jsx           # Main Dashboard Logic
 └── main.jsx          # Application Entry Point

