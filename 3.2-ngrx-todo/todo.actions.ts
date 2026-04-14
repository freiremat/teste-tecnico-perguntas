import { createAction, props } from '@ngrx/store';

interface IToDo {
    id: number,
    titulo: string,
    concluido: boolean,
}

// Action para carregar os ToDos
export const loadTodos = createAction('[ToDo] Load Todos');

//Action para trazer as tasks
export const loadTodosSuccess = createAction(
    '[ToDo] Load Todos Success',
    props<{ todos: IToDo[] }>()
)

//Action para trazer o erro
export const loadTodosError = createAction(
    '[ToDo] Load Todos Error',
    props<{ error: string }>()
)

//Action para descobrir qual task do ToDo
export const toggleTodoComplete = createAction(
    '[ToDo] Toggle Todo Complete',
    props<{ id: number }>()
)