import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import AddBookPage from './pages/AddBookPage.js';
import BookListPage from './pages/BookListPage.js';
import BookHistoryPage from './pages/BookHistoryPage.js';
import AddBookstorePage from './pages/AddBookstorePage.js';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/list" element={<BookListPage />} />
          <Route path="/history" element={<BookHistoryPage />} />
          <Route path="/add-bookstore" element={<AddBookstorePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;