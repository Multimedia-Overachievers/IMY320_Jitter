import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';  
import Home from './pages/Home';
import Test from './pages/Test';

function App() {

	return (
		<Router>
			<Routes>
				<Route render exact path="/" element={<Test/>} />
				{/* <Route render exact path="/test" element={} /> */}
			</Routes>
		</Router>
	);
}

export default App;
