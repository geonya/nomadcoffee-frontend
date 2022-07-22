import { useReactiveVar } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar, logUserOut, toggleDarkMode } from '../apollo';
import { routes } from '../routes';
import { useSeeMe } from '../hooks/useSeeMe';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ILayout {
  children: React.ReactNode;
  hasHeader?: boolean;
  hasFooter?: boolean;
  needMenu?: boolean;
}
const Layout = ({
  children,
  hasHeader = true,
  hasFooter = true,
  needMenu = false,
}: ILayout) => {
  const navigate = useNavigate();
  const darkMode = useReactiveVar(darkModeVar);
  const { data } = useSeeMe();
  const [menuPop, setMenuPop] = useState(false);
  const onMenuBtnClick = () => {
    setMenuPop((prev) => !prev);
  };

  return (
    <Container>
      {hasHeader && (
        <Header>
          {needMenu ? (
            <HeaderBtn onClick={onMenuBtnClick}>
              {/* Menu */}
              <svg
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                ></path>
              </svg>
            </HeaderBtn>
          ) : (
            <HeaderBtn onClick={() => navigate('..', { replace: true })}>
              {/* back */}
              <svg
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </HeaderBtn>
          )}
          <HeaderBtnContainer>
            <DarkModeBtnContainer>
              <DarkModeBtn
                id='checkbox'
                type='checkbox'
                onChange={() => toggleDarkMode(darkMode)}
              />
              <DarkModeBtnLabel htmlFor='checkbox' />
            </DarkModeBtnContainer>
          </HeaderBtnContainer>
        </Header>
      )}
      <Content>{children}</Content>
      {hasFooter && (
        <Footer>
          <IconBtn onClick={() => navigate(routes.home)}>
            {/* home */}
            <svg
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              ></path>
            </svg>
          </IconBtn>
          <IconBtn onClick={() => navigate(routes.search)}>
            {/* serach */}
            <svg
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </IconBtn>
          <IconBtn
            onClick={() => navigate(`/users/${data?.seeMyProfile.username}`)}
          >
            {/* user */}
            <svg
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              ></path>
            </svg>
          </IconBtn>
        </Footer>
      )}
      {/* Menu Pop */}
      <AnimatePresence>
        {menuPop && (
          <>
            <BlackOut
              onClick={onMenuBtnClick}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { type: 'tween', duration: 0.3 },
              }}
              exit={{ opacity: 0 }}
            />
            <Menu
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5, type: 'tween' },
              }}
              exit={{ opacity: 0 }}
            >
              <MenuItem onClick={() => navigate('/')}>
                <svg
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  ></path>
                </svg>
                <span>Home</span>
              </MenuItem>
              <MenuItem onClick={() => navigate('/search')}>
                <svg
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  ></path>
                </svg>
                <span>Search</span>
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/user/${data?.seeMyProfile.username}`)}
              >
                <svg
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  ></path>
                </svg>
                <span>User</span>
              </MenuItem>
              <MenuItem onClick={() => logUserOut(navigate)}>
                <svg
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  ></path>
                </svg>
                <span>Log Out</span>
              </MenuItem>
            </Menu>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: relative;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 50px;
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Content = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const HeaderBtn = styled.button`
  svg {
    width: 30px;
    height: 30px;
  }
`;
const Footer = styled.div`
  width: 100%;
  padding: 30px 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const IconBtn = styled.button`
  width: 25px;
  height: 25px;
  svg {
    color: ${(props) => props.theme.fontColor};
  }
`;

const HeaderBtnContainer = styled.div`
  display: flex;
`;
const DarkModeBtnContainer = styled.div`
  position: relative;
  width: 42px;
  height: 26px;
`;
const DarkModeBtnLabel = styled.label`
  position: absolute;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${(props) => props.theme.fontColor};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3.5px;
    background: ${(props) => props.theme.bgColor};
    transition: 0.2s;
  }
`;
const DarkModeBtn = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 42px;
  height: 26px;
  &:checked + ${DarkModeBtnLabel} {
    background: ${(props) => props.theme.fontColor};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const Menu = styled(motion.div)`
  position: absolute;
  width: 120px;
  height: 200px;
  left: 40px;
  top: 60px;
  opacity: 0.8;
  background-color: ${(props) => props.theme.checkedColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 20;
  padding: 10px;
  padding-bottom: 5px;
  span {
    width: 100%;
  }
`;

const BlackOut = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;
const MenuItem = styled.div`
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: start;
  align-items: center;
  svg {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
  span {
    font-size: 15px;
  }
  margin-bottom: 10px;
`;
