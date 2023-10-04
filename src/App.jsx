import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Results from './pages/Results';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Team from './pages/Team';

function App() {
	return (
		<Routes>
			<Route render exact path="/" element={<Landing />} />
			<Route render exact path="/dashboard" element={<Home />} />
			<Route exact path="/dashboard/test/:moduleCode/:chapterCode" element={<Test />} />
			<Route exact path="/result" element={<Results />} />
			<Route exact path="/team" element={<Team />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
