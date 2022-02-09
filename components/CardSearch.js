import { useState, useEffect } from "react";
import styled from "styled-components";

function CardSearch(props) {
  const [searchVal, setSearch] = useState("");
  const [options, setOptions] = useState({});
  const [optionsVisible, setOptionsVisible] = useState(true);

  // Sets the search value from the user keyed input
  const onTextChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setOptionsVisible(true);
  };

  // Pings scryfall for autocomplete suggestions
  useEffect(() => {
    if (searchVal.length > 1) {
      searchCardOptions(searchVal);
    }
  }, [searchVal]);

  const searchCardOptions = async (searchVal) => {
    const response = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${searchVal}`
    );
    const data = await response.json();
    await setOptions(data);
  };

  // Sets search value in input from suggestions list
  const suggestionSelected = (item) => {
    setSearch(item);
    setOptionsVisible(false);
    setOptions({});
  };

  // Searches scryfall api for individual card
  const searchCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.scryfall.com/cards/named?exact=${searchVal}&pretty=true`
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        alert(`${searchVal} was not found.`);
        throw new Error(message);
      }
      const data = await response.json();
      await props.setCards(data);
      setSearch("");
      setOptionsVisible(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <SearchWrapper>
      <form>
        <input
          value={searchVal}
          onChange={onTextChange}
          type="text"
          placeholder="Search.."
        />
        <button type="submit" value="Submit" onClick={searchCard}>
          Search
        </button>
      </form>
      <ul>
        {options.data && optionsVisible
          ? options.data.map((item) => (
              <li key={item}>
                <button onClick={() => suggestionSelected(item)}>{item}</button>
              </li>
            ))
          : null}
      </ul>
    </SearchWrapper>
  );
}

export default CardSearch;

const SearchWrapper = styled.div`
  form {
    margin: 0;
  }

  ul {
    margin: 0;
    position: absolute;
    z-index: 1;
    padding: 0;
  }
  li {
    list-style-type: none;
    button {
      border-radius: 0;
      width: 100%;
    }
  }
`;
