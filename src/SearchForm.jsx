import { useGlobalContext } from "./Context";

const SearchForm = () => {
  const { setSearchForm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    console.log(searchValue);
    setSearchForm(searchValue);
  };
  return (
    <section>
      <h1 className="title">unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="form-input search-input"
          type="text"
          placeholder="office"
          name="search"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;
