import React, {
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useTheme } from "./ThemeContext";

const movieReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return [
        ...state,
        { id: Date.now(), title: action.payload, watched: false },
      ];
    case "TOGGLE_WATCHED":
      return state.map((m) =>
        m.id === action.payload ? { ...m, watched: !m.watched } : m
      );
    case "REMOVE_MOVIE":
      return state.filter((m) => m.id !== action.payload);
    default:
      return state;
  }
};

export default function MovieApp() {
  const [movies, dispatch] = useReducer(movieReducer, []);
  const { darkMode, toggleTheme } = useTheme();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addMovie = useCallback(() => {
    const title = inputRef.current.value;
    if (title.trim()) {
      dispatch({ type: "ADD_MOVIE", payload: title });
      inputRef.current.value = "";
    }
  }, []);

  const removeMovie = useCallback(
    (id) => dispatch({ type: "REMOVE_MOVIE", payload: id }),
    []
  );
  const toggleWatched = useCallback(
    (id) => dispatch({ type: "TOGGLE_WATCHED", payload: id }),
    []
  );

  const stats = useMemo(
    () => ({
      total: movies.length,
      watched: movies.filter((m) => m.watched).length,
    }),
    [movies]
  );

  return (
    // changed to h-screen and flex-col for full window coverage
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Bar */}
      <header
        className={`w-full p-6 flex justify-between items-center border-b ${
          darkMode
            ? "bg-zinc-800 border-zinc-700"
            : "bg-white border-gray-200 shadow-sm"
        }`}
      >
        <h1 className="text-3xl font-black tracking-tight">
          MOVIE<span className="text-blue-500">TRACKER</span>
        </h1>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-xs uppercase tracking-widest opacity-50 font-bold">
              Progress
            </p>
            <p className="text-sm font-mono">
              {stats.watched} / {stats.total} Watched
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-5 py-2 rounded-full font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main Content Area - Expanded */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-6 md:p-12">
        {/* Input Card - Full Width */}
        <div
          className={`p-8 rounded-2xl mb-8 border transition-all ${
            darkMode
              ? "bg-zinc-800 border-zinc-700 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <label className="block text-sm font-bold mb-2 opacity-70">
            Add New Title
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              ref={inputRef}
              onKeyDown={(e) => e.key === "Enter" && addMovie()}
              placeholder="Enter movie name and press Enter..."
              className={`flex-1 p-4 text-lg rounded-xl border focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                darkMode
                  ? "bg-zinc-700 border-zinc-600 text-white"
                  : "bg-gray-50 border-gray-200"
              }`}
            />
            <button
              onClick={addMovie}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-black text-lg transition-transform active:scale-95"
            >
              ADD MOVIE
            </button>
          </div>
        </div>

        {/* Dynamic Grid Layout for Movie items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`flex flex-col justify-between p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
                movie.watched ? "opacity-60 grayscale-[0.5]" : ""
              } ${
                darkMode
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-white border-gray-100 shadow-md"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-6 truncate ${
                  movie.watched ? "line-through" : ""
                }`}
              >
                {movie.title}
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleWatched(movie.id)}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-tighter transition-colors ${
                    movie.watched
                      ? "bg-gray-500 text-white"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
                >
                  {movie.watched ? "Undo Watch" : "Mark Watched"}
                </button>
                <button
                  onClick={() => removeMovie(movie.id)}
                  className="px-5 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold text-xs transition-colors"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {movies.length === 0 && (
          <div className="text-center py-20 opacity-30">
            <p className="text-2xl font-bold italic">
              Your watchlist is empty...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
