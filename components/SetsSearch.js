import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";

//React select add image to icon
const { Option, SingleValue } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img
      src={props.data.icon}
      style={{ width: 20, marginRight: 10 }}
      alt={props.data.label}
    />
    {props.data.label}
  </Option>
);

const ValueOption = (props) => (
  <SingleValue {...props}>
    <img
      src={props.data.icon}
      style={{ width: 20, marginRight: 10 }}
      alt={props.data.label}
    />
    {props.data.label}
  </SingleValue>
);

//React select custom styles
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid black",
    margin: 20,
    cursor: "pointer",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

function SetsSearch(props) {
  const [selectedSet, setSelected] = useState("");
  const [options, setOptions] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
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
      setSelectOptions(
        coreSets.map((set) => {
          return { value: set.name, label: set.name, icon: set.icon_svg_uri };
        })
      );
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
    //Clear out previous filtered data data
    props.setFilteredCards(null);
    // Clear out pagUrls when new set is selected
    props.setPagUrls([]);
    //Search options for selected Set
    let setObject = await options.find((set) => set.name === setName);
    try {
      const res = await axios.get(setObject.search_uri);
      const data = await res.data;
      await props.setCards(data);
      await pushPageUrl(data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  //Changes the set name after it's been selected.
  const setSet = (value) => {
    const setName = value.value;
    setSelected(setName);
    getSetData(setName);
  };

  return (
    <Select
      styles={customStyles}
      id="selectSet"
      onChange={setSet}
      placeholder="Select a set..."
      options={selectOptions}
      components={{ Option: IconOption, SingleValue: ValueOption }}
    ></Select>
  );
}

export default SetsSearch;
