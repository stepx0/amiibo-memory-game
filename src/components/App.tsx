import { ApolloProvider } from '@apollo/client'
import apolloCli from 'api/ApolloCli'
import Game from 'components/Game'

const App = () => {
    return (
        <ApolloProvider client={apolloCli}>
            <Game />
        </ApolloProvider>
    )
}

export default App