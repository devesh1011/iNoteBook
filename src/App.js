import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Main, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

export default function App() {
	return (
		<>
			<NoteState>
				<Main>
					<Navbar />
					<Routes>
						<Route exact path='/' element={
							<Home />
						}></Route>

						<Route exact path='/about' element={
							<About />
						}></Route>
					</Routes>
				</Main>
			</NoteState>
		</>
	)
}
