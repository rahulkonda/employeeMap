import logo from './logo.svg';
import './App.css';
import Gmap from './components/Gmap';
import Map from './components/Googlemap';
import Employees from './components/Employees';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Employees/>
        <Map
    //  google={this.props.google}
     center={{lat: 18.5204, lng: 73.8567}}
     height='300px'
     zoom={15}/>
          {/* <Gmap/> */}
        
      </header>
    </div>
  );
}

export default App;
