import { createReducer, on } from '@ngrx/store';
import { IToDo, loadTodos, loadTodosSuccess, loadTodosError, toggleTodoComplete } from './todo.actions';

interface ITodoState {
    todos: IToDo[],
    loading: boolean,
    error: string | null,    
}

const estadoInicial: ITodoState = {
    todos: [],
    loading: false,
    error: null,
}

export const ToDoReducer = createReducer(
    estadoInicial,
    on(loadTodos, (state) => ({ ...state, loading: true })),
    on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
    on(loadTodosError, (state, { error }) => ({ ...state, error, loading: false })),
    on(toggleTodoComplete, (state, { id }) => ({
        ...state,
        todos: state.todos.map(todo => 
            todo.id === id ? { ...todo, concluido: !todo.concluido } : todo
        )
    }))
)