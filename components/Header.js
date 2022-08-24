import styled from "styled-components";

function Header() {
  return (
    <HeaderStyles>
      <div className="center">
        <h1 className="neon">MTG Card Search</h1>
      </div>
    </HeaderStyles>
  );
}

export default Header;

const HeaderStyles = styled.div`
  h1 {
    color: white;
  }
`;
