import './App.css';
import Header from './components/Header'
import From from './components/Form'
import Stats from './components/Stats'
import data from './data'


function App() {
  return (
    <div className="App">
      <Header />
      <Stats 
        stats={data[0].stats}
      />
      <From />
    </div>
  );
}

export default App;
