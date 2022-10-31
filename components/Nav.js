import styled from 'styled-components'

const NavContainer = styled.div`
  position: fixed;
  display: block;
  box-sizing: border-box;
  height: 48px;
  width: 100%;
  background: rgb(246, 189, 18);
  background: linear-gradient(90deg, rgba(246, 189, 18, 1) 0%, rgba(242, 246, 158, 1) 100%);
  font-family: 'Nothing You Could Do', cursive;
  font-size: 32px;
  color: #ffffff;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  z-index: 9999;
  /* text-shadow: 1px 1px 4px white; */
`

const Nav = ({}) => {
  return <NavContainer>Hit-list</NavContainer>
}

export default Nav
