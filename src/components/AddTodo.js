import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { addTodosAPI } from '../lib/api/todo';
import palette from '../styles/palette';

const Container = styled.div`
  padding: 16px;
  textarea {
    width: 100%;
    border-radius: 5px;
    height: 300px;
    border-color: ${palette.gray};
    margin-top: 12px;
    resize: none;
    padding: 12px;
    font-size: 16px;
  }
  .brush-icon {
    width: 16px;
    height: 16px;
  }
  .add-todo-header-title {
    font-size: 21px;
  }
  .add-todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .add-todo-submit-button {
      padding: 4px 8px;
      border: 1px solid black;
      border-radius: 5px;
      background-color: white;
      outline: none;
      font-size: 14px;
    }
  }
  .add-todo-colors-wrapper {
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    .add-todo-color-list {
      display: flex;
      button {
        width: 24px;
        height: 24px;
        margin-right: 16px;
        border: 0;
        outline: 0;
        border-radius: 50%;
        &:last-child {
          margin: 0;
        }
      }
      .add-todo-selected-color {
      border: 2px solid black !important;
    }
    }
  }
  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
`;

const AddTodo = () => {
  const history = useHistory();
  const [localColor, setLocalColor] = useState('');
  const [text, setText] = useState('');

  const addTodoItem = async () => {
    if (!localColor) return alert('색상을 선택해 주세요.');
    await addTodosAPI({
      text,
      color: localColor
    });
    history.push('/');
  };

  return (
    <Container>
      <div className='add-todo-header'>
        <h1 className='add-todo-header-title'>Add Todo</h1>
        <button
          type='button'
          className='add-todo-submit-button'
          onClick={() => addTodoItem()}
        >
          추가하기
        </button>
      </div>
      <div className='add-todo-colors-wrapper'>
        <div className='add-todo-color-list'>
          {
            ['red', 'orange', 'yellow', 'green', 'blue', 'navy'].map((color, index) => (
              <button
                key={index}
                className={`bg-${color} ${localColor === color ? 'add-todo-selected-color' : ''}`}
                onClick={() => setLocalColor(color)}
              />
            ))
          }
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
    </Container>
  );
};

export default AddTodo;
