import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

function Pagination(props) {
  const [count, setCount] = useState(0);

  const pushPageUrl = (cardsObj) => {
    props.setPagUrls((pagUrls) => [...pagUrls, cardsObj]);
  };

  const incrementCount = async () => {
    // Update state with incremented value
    setCount(count + 1);
    console.log({ count });
  };

  const decrementCount = () => {
    // Update state with incremented value
    setCount(count - 1);
    console.log({ count });
  };

  const nextCards = async () => {
    await incrementCount();
    try {
      const res = await axios.get(props.pagUrls[count].next_page);
      const data = await res.data;
      await props.setCards(data);
      await pushPageUrl(data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const prevCards = () => {
    decrementCount();
    const data = props.pagUrls[count - 1];
    console.log({ data });
    props.setCards(data);
  };

  return (
    <nav>
      <button onClick={prevCards} disabled={count === 0 ? true : false}>
        {" "}
        ← Prev
      </button>
      <button
        onClick={nextCards}
        disabled={!("next_page" in props.cards) ? true : false}
      >
        Next →
      </button>
    </nav>
  );
}

export default Pagination;
