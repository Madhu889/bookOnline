import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Login from './components/Login'
import CardsDetails from './components/BookDetails';
import Cards from './components/Books';
import {Routes,Route} from "react-router-dom";
function App() {
  return (
  <>
   <Header/>
   <Routes>
     <Route path='/' element={<Cards />} />
     <Route path="/login" element={<Login/>} />
     <Route path='/cart/:id' element={<CardsDetails />} />
   </Routes>
 
  </>
  );
}
export default App;
