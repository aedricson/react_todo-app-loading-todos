import React, { useCallback } from 'react';
import { FilterBy, Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todos: Todo[] | null;
  filterValue: FilterBy;
  setFilter: (value: FilterBy) => void;
}

export const Footer: React.FC<Props> = ({ todos, filterValue, setFilter }) => {
  const linkClass = useCallback(
    (value: FilterBy) => {
      return classNames('filter__link', { selected: filterValue === value });
    },
    [filterValue],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos?.length || 0} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={linkClass(FilterBy.ALL)}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={linkClass(FilterBy.ACTIVE)}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={linkClass(FilterBy.COMPLETED)}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
