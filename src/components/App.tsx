import '../scss/App.scss';
import Header from './Header';
import Board from './Board';

const cardImages: string[] = [
    'img/icon_000a0000-00380102.png',
    '/img/icon_0005ff00-023a0702.png',
    '/img/icon_00020000-00010002.png',
    '/img/icon_00130000-037a0002.png',
    '/img/icon_00150000-03670102.png',
    '/img/icon_00000000-00340102.png'
]

function App() {
    return (
        <div className="App App-container">
            <Header />
            <Board cardImages={cardImages} />
        </div>
    );
}

export default App;
