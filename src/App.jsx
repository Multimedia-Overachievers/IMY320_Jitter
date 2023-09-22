import React from 'react';
import {Routes, Route} from 'react-router-dom';  
import Home from './pages/Home';
import Test from './pages/Test';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Routes>
			<Route render exact path="/" element={<Home/>} /> 
			<Route exact path="/test/:moduleCode/:chapterCode" element={<Test/>} />
			<Route exact path="/result" element={<Results/>} />
			<Route path="*" element={<NotFound/>} />
		</Routes>
	);
}

export default App;
