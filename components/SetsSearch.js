import axios from "axios";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

function SetsSearch(props) {
  const [selectedSet, setSelected] = useState("");
  const [options, setOptions] = useState([]);
  const [isFirstRender, setFirstRender] = useState();

  //On page mount get all core & expansion set objects from api
  useEffect(async () => {
    try {
      const res = await axios.get("https://api.scryfall.com/sets/");
      const sets = await res.data;
      const coreSets = await sets.data.filter((set) => {
        if (
          set.set_type === "core" ||
          (set.set_type === "expansion" && set.card_count > 0)
        ) {
          return set;
        }
      });
      setOptions(coreSets);
      setSelected(coreSets[0].name);
      setFirstRender(true);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, []);

  //On first render load the newest set.
  useEffect(() => {
    if (isFirstRender === true) {
      getSetData(selectedSet);
      setFirstRender(false);
    } else {
      return;
    }
  }, [isFirstRender]);

  const pushPageUrl = (setUri) => {
    props.setPagUrls((pagUrls) => [...pagUrls, setUri]);
  };

  //When set is selected display all cards in set
  const getSetData = async (setName) => {
    //Clear out previous data
    // props.setCards(null);
    // Todo: clear out pagUrls when new set is selected
    props.setPagUrls([]);
    //Search options for selected Set
    let setObject = await options.find((set) => set.name === setName);
    // console.log({ setObject });
    try {
      const res = await axios.get(setObject.search_uri);
      const data = await res.data;
      await props.setCards(data);
      // console.log({ data });
      await pushPageUrl(data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  //Changes the set name after it's been selected.
  const setSet = (e) => {
    const setName = e.target.value;
    setSelected(setName);
    getSetData(setName);
  };

  return (
    <SearchWrapper>
      <select value={selectedSet} id="selectSet" onChange={setSet}>
        {options.map((set, i) => {
          if (set.card_count > 0) {
            return (
              <option key={i} value={set.name}>
                {set.name}
              </option>
            );
          }
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
