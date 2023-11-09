import React, { useEffect, useState } from "react";
import { Form, Button, Select, Input, Typography, Switch } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HeaderComponent from "./Header";

const { Option } = Select;

const fetchDepartments = () => {
	return axios
		.get("http://localhost:8085/allDepartments")
		.then((response) => {
			const data = response.data;
			const arr = [];

			data.forEach((each) => {
				let obj = {};
				Object.keys(each).forEach((key) => {
					if (key !== "isHeadOfTheDepartmentAvailable") obj = each[key];
					else obj[key] = each[key];
				});
				arr.push(obj);
			});

			return arr;
		})
		.catch(() => {
			return [];
		});
};

const fetchDepartmentsCourses = (id) => {
	return axios
		.get(`http://localhost:8085/department/courses/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch(() => {
			return [];
		});
};

const InstructorForm = ({ }) => {
	const history = useHistory();
	const [departments, setDepartments] = useState([]);
	const [courses, setCourses] = useState({ });


	useEffect(() => {
		fetchDepartments().then((data) => {
			setDepartments(data);
		});
	}, []);

	console.log({courses})

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
				<Typography.Title level={3}>Add instructor</Typography.Title>
				<Form
					name="appointment"
					layout="vertical"
					onFinish={async (values) => {
						const res = await axios
							.post("http://localhost:8085/save/instructor", {
								...values,
								isHeadOfDepartment: values.isHeadOfDepartment ? 1 : 0,
							})
							.then((resp) => resp.data)
							.catch((error) => {
								return error.message;
							});

						if (res.id) {
							history.push("/instructors");
						}
					}}
				>
					<Form.Item name="name" label="Name">
						<Input placeholder="name" />
					</Form.Item>
					<Form.Item name="phone" label="Phone Number">
						<Input placeholder="phone number" />
					</Form.Item>
					<Form.Item name="email" label="Email">
						<Input placeholder="email" type="email" />
					</Form.Item>
					<Form.Item name="departmentId" label="Departments">
						<Select
							placeholder="Select Department"
							onChange={async (value) => {
								if (value) {
									const res = await fetchDepartmentsCourses(value);
									setCourses(res);
								}
							}}
						>
							{departments.map((department) => (
								<Option value={department.id}>{department.name}</Option>
							))}
						</Select>
					</Form.Item>
					{courses.isHeadOfTheDepartmentAvailable && courses.isHeadOfTheDepartmentAvailable === "true" && <Form.Item name="isHeadOfDepartment" label="Head of Department">
						<Switch />
	
					</Form.Item>}
					
					{
						<Form.Item name="courses" label="Courses">
							<Select placeholder="Select Courses" mode="multiple">
								{courses.courses &&
									courses.courses.map((course) => (
										<Option value={course.id}>{course.courseCode}</Option>
									))}
							</Select>
						</Form.Item>
					}

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button
							style={{ width: 150, marginRight: 20 }}
							onClick={() => history.push("/instructors")}
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

export default InstructorForm;
