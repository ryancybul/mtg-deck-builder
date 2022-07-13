import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

function SetsSearch(props) {
  const [selectedSet, setSelected] = useState("Kamigawa: Neon Dynasty");
  const [options, setOptions] = useState([]);

  //On page mount get all core & expansion sets from api
  useEffect(async () => {
    try {
      const res = await axios.get("https://api.scryfall.com/sets/");
      const sets = await res.data;
      const coreSets = await sets.data.filter((set) => {
        if (set.set_type === "core" || set.set_type === "expansion") {
          return set;
        }
      });
      await setOptions(coreSets);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  //Changes the set name after it's been selected.
  const setSet = (e) => {
    setSelected(e.target.value);
  };

  return (
    <SearchWrapper>
      <select value={selectedSet} id="selectSet" onChange={setSet}>
        {options.map((set, i) => {
          return (
            <option key={i} value={set.name}>
              {set.name}
            </option>
          );
        })}
      </select>
    </SearchWrapper>
  );
}

export default SetsSearch;

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
