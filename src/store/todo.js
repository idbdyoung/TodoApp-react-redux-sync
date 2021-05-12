const SET_TODO = 'todo/SET_TODO';
const SET_TODO_SUCCESS = 'todo/SET_TODO_SUCCESS';
const SET_TODO_ERROR = 'todo/SET_TODO_ERROR';

export const setTodo = () => {
  return {
    type: SET_TODO,
  };
};
export const setTodoSuccess = (todos) => {
  return {
    type: SET_TODO_SUCCESS,
    todos,
  };
};
export const setTodoError = (error) => {
  return {
    type: SET_TODO_ERROR,
    error,
  };
};

const initialState = {
  loading: false,
  todos: [],
  error: null,
};

export default function reducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
        error: null,
      };
    case SET_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
