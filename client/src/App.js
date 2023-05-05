
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/homepage.tsx'
import WalletContextProvider from './context/wallet.context.tsx';

function App() {
  return (
    <div className="App">
      <WalletContextProvider>
        <HomePage />
      </WalletContextProvider>
    </div>
  );
}

export default App;
