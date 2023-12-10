import axios from "axios";
import SearchForm from "../components/SearchForm";
import MoviesList from "../components/MoviesList";
import { API_KEY } from "../contants";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "marvel";

  try {
    const movieSearchEndpoint = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`;
    const response = await axios.get(movieSearchEndpoint);

    return {
      movieApiResponse: response.data,
      searchTerm,
      isError: false,
      error: "",
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.Error || error.message || "Something went wrong";

    return {
      movieApiResponse: null,
      searchTerm,
      isError: true,
      error: errorMessage,
    };
  }
}

function Home() {
  const data = useLoaderData();

  return (
    <div>
      <SearchForm searchTerm={data.searchTerm} />
      <MoviesList data={data} />
    </div>
  );
}

export default Home;
