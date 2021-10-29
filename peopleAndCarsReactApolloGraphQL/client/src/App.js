import './App.css';
import Title from './components/layout/Title';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import People from './components/lists/People';
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import PersonDetail from './components/listItems/PersonDetail';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: 'http://localhost:4004/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/">
          <div className="App">
            <Title />
            <AddPerson />
            <AddCar />
            <People />
          </div>
          </Route>
          <Route exact path="/:id" component={PersonDetail} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
