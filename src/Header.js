import React from "react";
import { Link } from "react-router-dom";

export default function HeaderComponent() {
	return (
		<header
			style={{
				height: "70px",
				backgroundColor: "#cdcbcb",
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				padding: 10,
			}}
		>
			<div>
				<h2>CMS</h2>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<h2
					style={{
						marginRight: "10px",
					}}
				>
					<Link to={"/students"}>Students</Link>
				</h2>
				<h2>
					<Link to={"/instructors"}>Instructors</Link>
				</h2>
			</div>
		</header>
	);
}
