import { useState, useEffect } from "react";
import Head from "next/head";
import Card from "../components/Card";
import styled from "styled-components";

export default function Home() {
  const [card, setCard] = useState();
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
    if (searchVal.length > 2) {
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
      await setCard(data);
      setSearch("");
      setOptionsVisible(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <PageWrapper>
      <Head>
        <title>Card Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
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
        {options.data && optionsVisible
          ? options.data.map((item) => (
              <li key={item}>
                <button onClick={() => suggestionSelected(item)}>{item}</button>
              </li>
            ))
          : null}
      </div>
      {card ? <Card card={card} /> : null}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  form {
    padding: 20px;
  }
  li {
    list-style-type: none;
  }
`;
