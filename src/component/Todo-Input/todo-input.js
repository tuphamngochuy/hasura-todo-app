import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TODO, GET_TODOS } from '../../graphql/queries';
import './todo-input.scss';

const TodoInput = () => {
  const [todoInput, setTodoInput] = useState({
    name: '',
    done: false
  });

  const { name, done } = todoInput;

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [
      { query: GET_TODOS }
    ]
  });

  const addTodoHandler = () => {
    addTodo({ variables: { name, done }});
    setTodoInput({
      name: '',
      done: false
    })
  }

  const changeInputHandler = (e) => {
    if (e.target.name === 'name') {
      setTodoInput({ ...todoInput, name: e.target.value });
    } else {
      setTodoInput({...todoInput, done: !done});
    }
  }

  return <div className='todo-input-container'>
    <input
      className='text-input'
      type='text'
      placeholder='Add a task'
      value={ name }
      name='name'
      onChange={ changeInputHandler }
      required
    />
    <div className='check-input'>
      Done
      <input 
        type='checkbox'
        checked={ done }
        name='done'
        onChange={ changeInputHandler }
        required
      />
    </div>
    <button onClick={ addTodoHandler }>Add</button>
  </div>
}

export default TodoInput