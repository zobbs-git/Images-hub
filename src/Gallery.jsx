import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./Context";

const url = `https://api.unsplash.com/search/photos/?client_id=${
  import.meta.env.VITE_MY_API_KEY
}`;

function Gallery() {
  const { searchForm } = useGlobalContext();

  const response = useQuery({
    queryKey: ["images", searchForm],
    queryFn: async () => {
      const info = await axios.get(`${url}&query=${searchForm}`);

      return info.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }
  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          ></img>
        );
      })}
    </section>
  );
}
export default Gallery;
