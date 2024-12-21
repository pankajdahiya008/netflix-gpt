import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import hfclient from "../utils/hfclient";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleSearchClick = async () => {
    try {
      console.log(searchText.current.value);
  
      // Initialize Hugging Face client with your API key
  
      // Construct the prompt for movie recommendations
      const query =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma-separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
  
      // Make the request to Hugging Face's chatCompletion model
      const chatCompletion = await hfclient.chatCompletion({
        model: 'meta-llama/Llama-3.2-3B-Instruct', // You can change this to any other model that fits your needs
        messages: [
          {
            role: 'user',
            content: query,
          },
        ],
        max_tokens: 500,  // Adjust this based on how much response you want
      });
  
      // Extract content from the response
      const contentResponse = chatCompletion.choices[0].message.content;
      console.log("Raw Response:", JSON.stringify(contentResponse));

      // Extract the movie names from the content
      const hfMovies = contentResponse
      ?.split(",") // Split by commas
      .map((movie) => movie.trim()); // Trim whitespace from each movie name
  
      console.log("Recommended Movies:", hfMovies);
  
      // Fetch details for each movie using TMDB API (or your preferred method)
      const promiseArray = hfMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
  
      console.log("TMDB Results:", tmdbResults);
  
      // Dispatch results to the store (adjust according to your state management)
      dispatch(
        addGptMovieResult({ movieNames: hfMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
      // TODO: Implement better error handling logic
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
