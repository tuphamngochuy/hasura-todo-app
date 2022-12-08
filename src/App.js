import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import TodoInput from './component/Todo-Input/todo-input';
import Tasks from './component/Tasks/Tasks';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/v1/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={ client }>
      <div className="App">
        <TodoInput />
        <Tasks />
      </div>
    </ApolloProvider>
  );
}

export default App;
