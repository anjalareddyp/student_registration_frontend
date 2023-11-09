import { Button, Table } from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "./Header";
import { useHistory } from "react-router-dom";

export default function Students() {
	const history = useHistory();
	const [data, setData] = useState([]);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			width: 10,
		},
		{
			title: "Name",
			dataIndex: "name",
			width: 10,
		},
		{
			title: "Registration Number",
			dataIndex: "registrationNo",
			width: 10,
		},
		{
			title: "Email",
			dataIndex: "email",
			width: 10,
		},
		{
			title: "Phone Number",
			dataIndex: "phone",
			width: 10,
		},
	];

	const expandedRowRender = ({ courses }) => {
		const columns = [
			{
				title: "ID",
				dataIndex: "id",
				width: 10,
			},
			{
				title: "Course Code",
				dataIndex: "courseCode",
				width: 10,
			},
			{
				title: "Course Name",
				dataIndex: "courseDescription",
				width: 10,
			},
		];

		return <Table columns={columns} dataSource={courses} pagination={false} />;
	};

	useEffect(() => {
		loadStudents();
	}, []);
	const loadStudents = async () => {
		await axios
			.get("http://localhost:8085/allStudents")
			.then((response) => {
				setData(response.data);
				return response.data;
			})
			.catch((error) => {
				return { msg: error.message };
			});
	};

	return (
		<>
			<HeaderComponent />
			<Button
				onClick={() => history.push("/student-form")}
				style={{ marginTop: 10 }}
			>
				Add Student
			</Button>
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				rowKey={"id"}
				style={{
					margin: "auto",
				}}
				expandable={{ expandedRowRender }}
			/>
		</>
	);
}
