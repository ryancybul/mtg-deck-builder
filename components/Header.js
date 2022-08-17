import styled from "styled-components";

function Header() {
  return (
    <HeaderStyles>
      <div className="center">
        <h1>MTG Card Search</h1>
      </div>
    </HeaderStyles>
  );
}

export default Header;

const HeaderStyles = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(109, 69, 171, 1) 50%,
    rgba(5, 80, 96, 1) 100%
  );
  h1 {
    color: white;
  }
`;
