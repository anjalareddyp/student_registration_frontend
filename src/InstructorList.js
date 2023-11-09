import { Button, Table } from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "./Header";
import { useHistory } from "react-router-dom";

export default function InstructorList() {
	const history = useHistory();
	const [data, setData] = useState([]);
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
			title: "Email",
			dataIndex: "email",
			width: 10,
		},
		{
			title: "Department",
			render: (_, record) => <p>{record?.departmentId?.name}</p>,
			width: 10,
		},
		{
			title: "Head of Department",
			render: (_, record) => (
				<p>{record?.departmentId?.isHeadOfDepartment > 0 ? "yes" : "no"}</p>
			),
			width: 10,
		},
	];

	useEffect(() => {
		loadinstructors();
	}, []);
	const loadinstructors = async () => {
		await axios
			.get("http://localhost:8085/allInstructors")
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
				onClick={() => history.push("/instructor-form")}
				style={{ marginTop: 10 }}
			>
				Add Instructor
			</Button>
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				rowKey={"id"}
				expandable={{ expandedRowRender }}
			/>
		</>
	);
}
