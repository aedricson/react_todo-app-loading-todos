import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { FilterBy, Todo, TodoError } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<TodoError | null>(null);
  const [filterValue, setFilterValue] = useState<FilterBy>(FilterBy.ALL);

  const filteredTodos = useMemo(() => {
    if (!todos) {
      return null;
    }

    return todos.filter(todo => {
      switch (filterValue) {
        case FilterBy.ACTIVE:
          return !todo.completed;

        case FilterBy.COMPLETED:
          return todo.completed;

        case FilterBy.ALL:
        default:
          return true;
      }
    });
  }, [filterValue, todos]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(TodoError.LOAD));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              setFilter={setFilterValue}
              todos={filteredTodos}
              filterValue={filterValue}
            />
          </>
        )}
      </div>

      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
