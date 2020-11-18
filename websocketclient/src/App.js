import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect } from 'react';
import './App.css';



function App() {
  
  useEffect(() =>{
    const client = new W3CWebSocket('ws://127.0.0.1:8000');
    client.onopen = () => {
     console.log('WebSocket CLient Connected')
   }
  },[])

  return (
    <div className="App">
     <h1> Testing the App!</h1>
    </div>
  );
}

export default App;
