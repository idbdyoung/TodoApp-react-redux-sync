import { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deleteTodosAPI,
  getTodosAPI,
  writeTodosAPI,
} from '../lib/api/todo';
import {
  setTodo,
  setTodoSuccess,
  setTodoError,
} from '../store/todo';

import TodoList from '../components/TodoList';
import Loading from '../components/Loading';

const TodoListContainer = () => {
  const { loading, todos, error } = useSelector(state => state.todo);
  const dispatch = useDispatch();

  const onCheckTodo = async (todos, id) => {
    try {
      await writeTodosAPI(id);
      const newTodos = todos.map(todo => {
        if (todo.id === id) return { ...todo, checked: !todo.checked };
        return todo;
      });
      dispatch(setTodoSuccess(newTodos));
    } catch (error) {
      dispatch(setTodoError(error));
    }
  };
  const onDeleteTodo = async (todos, id) => {
    try {
      await deleteTodosAPI(id);
      const newTodos = todos.filter(todo => todo.id !== id);
      dispatch(setTodoSuccess(newTodos));
    } catch (error) {
      dispatch(setTodoError(error));
    }
  };

  useEffect(() => {
    (async function () {
      dispatch(setTodo());
      try {
        const { data } = await getTodosAPI();
        setTimeout(() => {
          dispatch(setTodoSuccess(data));
        }, 3000);
      } catch (error) {
        dispatch(setTodoError(error));
      }
    })();
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) alert('네트워크 에러입니다.');

  return (
    <TodoList
      todos={todos}
      onCheckTodo={onCheckTodo}
      onDeleteTodo={onDeleteTodo}
    />
  );
};

export default TodoListContainer;
