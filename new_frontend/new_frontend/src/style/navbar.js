import styled from "styled-components";

export const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;

  &:hover {
    color: #7b7fda;
  }
`;

export const Nav = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  width: 100vw;
  position: fixed;
  /* margin: -60px; */
  height:60px;
  top: 0;
  right: 0;
  left: 0px;
  z-index:9999;
`;

export const Logo = styled.a`
  padding: 1rem 0;
  color: #7b7fda;
  text-decoration: none;
  font-weight: 800;
  font-size: 1rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

export const SearchBox = styled.a`
  padding: 1rem 0;
  display:flex;
  justify-content:center;
  align-items:center;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: relative; */

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

// export const Hamburger = styled.div`
//   display: none;

//   flex-direction: column;
//   cursor: pointer;

//   span {
//     height: 2px;
//     width: 25px;
//     background: #7b7fda;
//     margin-bottom: 4px;
//     border-radius: 5px;
//   }

//   @media (max-width: 768px) {
//     display: flex;
//   }
// `;
