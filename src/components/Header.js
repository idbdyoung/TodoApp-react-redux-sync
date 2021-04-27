import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 53px;
  padding: 0 12px;
  border-bottom: 1px solid gray;
  h1 {
    font-size: 21px;
  }
`;

const Header = () => {
  return (
    <Container>
      <h1>TodoList</h1>
    </Container>
  );
};

export default Header;
