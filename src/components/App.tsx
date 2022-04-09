import { ApolloClient, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { RestLink } from 'apollo-link-rest';
import Game from './Game'

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message }) => {
            alert(`GraphQL error ${message}`);
        })
    }
})

const link = from([
    errorLink,
    new RestLink({ uri: "https://amiiboapi.com/api/" })
])

// Setup your client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Game />
        </ApolloProvider>
    )
}

export default App