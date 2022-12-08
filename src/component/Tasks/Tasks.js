import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_TODOS, REMOVE_TODO, TOGGLE_DONE } from '../../graphql/queries';
import './Tasks.scss'

const Tasks = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [removeTask] = useMutation(REMOVE_TODO, {
    refetchQueries: [
      { query: GET_TODOS }
    ]
  });

  const [toggleDone] = useMutation(TOGGLE_DONE, {
    refetchQueries: [
      { query: GET_TODOS }
    ]
  });

  const clearTaskHandler = (id) => {
    removeTask({ variables: { id }});
  }

  const toggleDoneHandler = (id, done) => {
    toggleDone({ variables: { id, done}});
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{ error.message }</div>
  }

  return <div className='tasks-container'>
    <table>
      {
        data && data.todos.map((todo, index) => todo.name && <tr key={ index }>
            <td className='td-content-name'>{ todo.name }</td>
            <td className='td-content-done'>{ todo.done ? 'Completed': 'In progress' }</td>
            <td className='td-button'><button onClick={ () => toggleDoneHandler(todo.id, !todo.done)}>{ !todo.done ? 'Complete' : 'Restart' }</button></td>
            <td className='td-button'><button onClick={ () => clearTaskHandler(todo.id)}>Clear</button></td>
          </tr>
        )
      }
    </table>
  </div>
}

export default Tasks;