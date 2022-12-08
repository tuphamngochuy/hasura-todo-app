import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query get_todos {
    todos {
      id
      name
      done
      created_at
    }
  }
`;

export const ADD_TODO = gql`
  mutation($name: String!, $done: Boolean!) {
    insert_todos_one(object: { name: $name, done: $done }) {
      id
      name
      done
      created_at
    }
  }
`;

export const TOGGLE_DONE = gql`
  mutation($id: uuid!, $done: Boolean!) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { done: $done }
    ) {
      id
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;