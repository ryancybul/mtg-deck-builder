import Image from "next/image";
import styled from "styled-components";

function Card(card) {
  return (
    <CardWrapper>
      <Image
        alt={card.card.name}
        blurDataURL={card.card.image_uris.small}
        src={card.card.image_uris.normal}
        placeholder="blur"
        width={312}
        height={438}
      />
    </CardWrapper>
  );
}

export default Card;

const CardWrapper = styled.div`
  display: block;
`;
