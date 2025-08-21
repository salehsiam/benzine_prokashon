import React from "react";
import { useSearchParams } from "react-router-dom";

const GenreFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGenre = searchParams.get("genre") || "";
  const genres = [
    "থ্রিলার",
    "হরর",
    "রোমান্টিক",
    "গোয়েন্দা",
    "ঐতিহাসিক",
    "ফ্যান্টাসি",
    "মিথলজি",
    "ভ্রমণ",
    "শিকার",
    "অ্যাভেঞ্চার",
    "মিস্ট্রি",
    "রম্য",
    "ধর্মীয়",
    "নন-ফিকশন",
  ];

  const handleGenreClick = (genre) => {
    const params = Object.fromEntries(searchParams);
    if (genre === "") {
      delete params.genre; // remove genre filter if "All" is clicked
      setSearchParams({ ...params, page: 1 });
    } else {
      setSearchParams({ ...params, genre, page: 1 });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => handleGenreClick("")}
        className={`px-3 py-1 rounded ${
          selectedGenre === ""
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleGenreClick(genre)}
          className={`px-3 py-1 rounded-lg ${
            selectedGenre === genre
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
