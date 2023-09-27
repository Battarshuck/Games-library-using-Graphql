import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './network/apollo/apollo.js';
import GetGames from './components/games/getGames.js';
import AddGame from './components/form/addGame.js';

function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      {/*  */}
      <AddGame />
      <GetGames />
    </ApolloProvider>
  );
}

export default App;
