import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import InstructorList from "./InstructorList";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";
import InstructorForm from "./InstructorForm";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" component={() => <StudentList />} exact />
					<Route path="/student-form" component={() => <StudentForm />} exact />
					<Route
						path="/instructor-form"
						component={() => <InstructorForm />}
						exact
					/>
					<Route path="/students" component={() => <StudentList />} exact />
					<Route
						path="/instructors"
						component={() => <InstructorList />}
						exact
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
