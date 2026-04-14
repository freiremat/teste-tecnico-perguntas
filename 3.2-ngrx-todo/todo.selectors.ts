import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from './todo.reducer';

const selectTodoState = createFeatureSelector<ITodoState>('todos');

export const selectAllTodos = createSelector(
    selectTodoState,
    (state) => state.todos
);

export const selectPendingTodos = createSelector(
    selectTodoState,
    (state) => state.todos.filter(todo => !todo.concluido)
);