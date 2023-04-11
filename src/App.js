import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Main, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

export default function App() {
	const [alert, setAlert] = useState("Your Message");

	const showAlert = (message, type) => {
        setAlert(
            {
                message: message,
                type: type
            }
        )
        setTimeout(
            () => {
                setAlert(null)
            }, 1500
        );
    }

	return (
		<>
			<NoteState>
				<Main>
					<Navbar />
					< Alert message={"THis is an alert for isahdf s"} alert={alert}/>
					<div className="container">
						<Routes>
							<Route exact path='/' element={
								<Home />
							}></Route>

							<Route exact path='/about' element={
								<About />
							}></Route>

							<Route exact path='/login' element={
								<Login />
							}></Route>

							<Route exact path='/singup' element={
								< SignUp />
							}></Route>
						</Routes>
					</div>

				</Main>
			</NoteState>
		</>
	)
}
