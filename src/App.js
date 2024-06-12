import "./App.css";
import Router from "./routes/indexRouter";

function App() {
  return <Router />;
}

export default App;

// import {useEffect, useState} from "react";
// import axios from "axios";

// function App() {
//     const [hello, setHello] = useState('');

//     useEffect(() => {
//         axios.get('/api/test')
//             .then((res) => {
//                 setHello(res.data);
//             })
//     }, []);
//     return (
//         <div className="App">
//             백엔드 데이터 : {hello}
//         </div>
//     );
// }

// export default App;