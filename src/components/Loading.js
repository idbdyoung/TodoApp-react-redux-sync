import {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  const [text, setText] = useState('loading');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      if (count === 5) {
        setCount(0);
        setText('loading');
        return;
      }
      setCount(count + 1);
      setText(text + '.');
    }, 500);

    return () => clearInterval(id);
  }, [
    text,
    count
  ]);

  return (
    <Container>
      {
        text
      }
    </Container>
  );
};

export default Loading;
