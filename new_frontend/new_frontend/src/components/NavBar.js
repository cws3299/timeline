import React, { useState } from "react";
import { Nav, Logo, Hamburger, Menu, MenuLink , SearchBox } from "../style/navbar";
import { history } from "../redux/configureStore";
import './NavBar.css';

function NavBar () {
  const [isOpen, setIsOpen] = useState(false);

  const goTimeCapsule = () => {
    history.push('/main/timecapsule')
  } 

  const goTimeLine = () => {
    history.push('/main/timeline')
  } 

  const goPostBox = () => {
    history.push('/main/postbox')
  } 

  const goMyPage = () => {
    history.push('/main/mypage')
  } 

  return (
    <Nav>
      <Logo href="">
        Time<span>Line</span>
      </Logo>
      <Menu isOpen={isOpen}>
        <SearchBox> 
          <div className="box">
            <div className="container-4">
              <input type="search" id="search" placeholder="Search..." />
              <button className="icon"><i className="fa fa-search"></i></button>
            </div>
          </div>
        </SearchBox> 
        <MenuLink onClick={goTimeCapsule}>타임캡슐</MenuLink>
        <MenuLink onClick={goTimeLine}>타임라인</MenuLink>
        <MenuLink onClick={goPostBox}>우체통</MenuLink>
        <MenuLink onClick={goMyPage}>MyPage</MenuLink>
      </Menu>
    </Nav>
  );
};

export default NavBar;
{/* <Hamburger onClick={() => setIsOpen(!isOpen)}>
  <span />
  <span />
  <span />
</Hamburger> */}