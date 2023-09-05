import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';  
import Home from './pages/Home';
import SideBar from './components/SideBar';

function App() {

	return (
		<Router>
			<Routes>
				<Route render exact path="/" element={<Home/>} />
			</Routes>
			<SideBar/>
		</Router>
	);
}

export default App;
