import {
  useHistory,
  useLocation,
} from 'react-router';
import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 53px;
  padding: 0 12px;
  border-top: 1px solid gray;
  .footer-button {
    font-size: 32px;
    width: 32px;
    height: 32px;
    border-radius: 5px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    line-height: 0;
    outline: none;
  }
`;

const Footer = () => {
  const history = useHistory();
  const isMain = useLocation().pathname === '/';

  return (
    <Container>
      <button
        type='button'
        className='footer-button'
        onClick={() => history.push(`${isMain ? '/todo/add' : '/'}`)}
      >
        {isMain ? '+' : '-'}
      </button>
    </Container>
  );
};

export default Footer;
