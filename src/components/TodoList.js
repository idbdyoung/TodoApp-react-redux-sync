import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import palette from '../styles/palette';
import {
  getTodosAPI,
  writeTodosAPI,
  deleteTodosAPI,
} from '../lib/api/todo';

import TrashCanIcon from '../trash_can.svg';
import CheckMarkIcon from '../check_mark.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${palette.gray};
  border-left: 1px solid ${palette.gray};
  .todo-list {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    .todo-item {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid ${palette.gray};
      .todo-left-side {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        .todo-color-block {
          width: 12px;
          height: 100%;
        }
        .todo-text {
          display: flex;
          align-items: center;
          width: 100%;
          margin-left: 12px;
          font-size: 16px;
        }
        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }
      }
      .todo-right-side {
        display: flex;
        align-items: center;
        margin-right: 12px;
        svg {
          &:first-child {
            margin-right: 16px;
          }
        }
        .todo-trash-can {
          width: 16px;
          height: 16px;
        }
        .todo-check-mark {
          width: 16px;
          height: 16px;
        }
        .todo-button {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid ${palette.gray};
          background-color: transparent;
          outline: none;
        }
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

const TodoList = () => {
  const [localTodos, setLocalTodos] = useState([]);

  const checkTodo = async (id) => {
    await writeTodosAPI(id);

    const newTodos = localTodos.map(todo => {
      if (todo.id === id) return { ...todo, checked: !todo.checked };

      return todo;
    });
    setLocalTodos(newTodos);
  };
  const deleteTodo = async (id) => {
    await deleteTodosAPI(id);
    const newTodos = localTodos.filter(todo => todo.id !== id);
    setLocalTodos(newTodos);
  };

  useEffect(() => {
    (async function () {
      const { data } = await getTodosAPI();
      setLocalTodos(data);
    })();
  }, []);

  return (
    <Container>
      <ul className='todo-list'>
        {
          localTodos.map(todo => (
            <li className='todo-item' key={todo.id}>
              <div className='todo-left-side'>
                <div className={`todo-color-block bg-${todo.color}`}/>
                <p className={`todo-text ${todo.checked? 'checked-todo-text' : ''}`}>
                  {todo.text}
                </p>
              </div>
              <div className='todo-right-side'>
                {
                  todo.checked && (
                    <>
                      <img
                        src={TrashCanIcon}
                        alt='trash-can'
                        className='todo-trash-can'
                        onClick={() => deleteTodo(todo.id)}
                      />
                      <img
                        src={CheckMarkIcon}
                        alt='check-mark'
                        className='todo-check-mark'
                        onClick={() => checkTodo(todo.id)}
                      />
                    </>
                  )
                }
                {
                  !todo.checked && (
                    <button
                      type='button'
                      className='todo-button'
                      onClick={() => checkTodo(todo.id)}
                    />
                  )
                }
              </div>
            </li>
          ))
        }
      </ul>
    </Container>
  );
};

export default TodoList;
