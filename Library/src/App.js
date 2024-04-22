import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './views/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import DonateBook from './components/DonateBook/DonateBook';
import AllBooks from './components/AllBooks/AllBooks';
import MyDonations from './components/MyDonations/MyDonations';
import MyBooks from './components/MyBooks/MyBooks';
import AllTakenBooks from './components/AllTakenBooks/AllTakenBooks';

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/donateBook" element={<DonateBook />} />
          <Route path="/allBooks" element={<AllBooks />} />
          <Route path="/myDonations" element={<MyDonations />} />
          <Route path="/myBooks" element={<MyBooks />} />
          <Route path="/allTakenBooks" element={<AllTakenBooks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;