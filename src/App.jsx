import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';  
import Home from './pages/Home';

function App() {

	return (
		<Router>
			<Routes>
				<Route render exact path="/" element={<Home/>} />
			</Routes>
		</Router>
	);
}

export default App;
