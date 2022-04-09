
import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { onError } from "@apollo/client/link/error"
import { RestLink } from 'apollo-link-rest'

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message }) => {
            console.log(`GraphQL error ${message}`)
            alert("Oops, couldn't download cards correctly.")
        })
    }
})

const link = from([
    errorLink,
    new RestLink({ uri: "https://amiiboapi.com/api/" })
])

const apolloCli = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
})

export default apolloCli