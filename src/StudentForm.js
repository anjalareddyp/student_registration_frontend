import React, { useEffect, useState } from "react";
import { Form, Button, Select, Input, Typography } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HeaderComponent from "./Header";

const { Option } = Select;

export const fecthCourses = () => {
	return axios
		.get("http://localhost:8085/allCourses")
		.then((response) => {
			return response.data;
		})
		.catch(() => {
			return [];
		});
};

export const fetchDepartments = () => {
	return axios
		.get("http://localhost:8085/allDepartments")
		.then((response) => {
			return response.data;
		})
		.catch(() => {
			return [];
		});
};

const StudentForm = ({}) => {
	const [courses, setCourses] = useState([]);
	const history = useHistory();

	useEffect(() => {
		fecthCourses().then((data) => {
			setCourses(data);
		});
	}, []);

	return (
		<>
			<HeaderComponent />
			<div
				style={{
					maxWidth: "800px",
					minWidth: "400px",
					margin: "auto",
					marginTop: 10,
				}}
			>
				<Typography.Title level={3}>Add student</Typography.Title>
				<Form
					name="appointment"
					layout="vertical"
					onFinish={async (values) => {
						const res = await axios
							.post("http://localhost:8085/save/student", values)
							.then((resp) => {
								return resp.data;
							})
							.catch((error) => {
								return error.message;
							});

						if (res.id) {
							history.push("/students");
						}
					}}
				>
					<Form.Item name="name" label="Name">
						<Input placeholder="name" />
					</Form.Item>
					<Form.Item name="registrationNo" label="Registration Number">
						<Input placeholder="registration" />
					</Form.Item>
					<Form.Item name="email" label="Email">
						<Input placeholder="email" type="email" />
					</Form.Item>
					<Form.Item name="phone" label="Phone number">
						<Input placeholder="phone number" />
					</Form.Item>
					<Form.Item name="courses" label="Courses">
						<Select placeholder="Select Courses" mode="multiple">
							{courses.map((course) => (
								<Option value={course.id}>{course.courseCode}</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button
							style={{ width: 150, marginRight: 20 }}
							onClick={() => history.push("/students")}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							shape="round"
							htmlType="submit"
							style={{ width: 150 }}
						>
							Add
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default StudentForm;
