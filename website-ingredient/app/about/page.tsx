import { title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div>
			<h1 className={title()}>About</h1>

			<p>
				This is the about page of our website. Here, we provide information about our company, our team, and our mission.
			</p>

			<h2>Our Team</h2>
			<ul>
				<li>Jack Berkowitz- Front end </li>
				<li>Dima Bezborodov- AWS developer</li>
				<li>Andrew Catapano- Back end </li>
				<li>John Costa- Front end </li>
			</ul>

			<h2>Our Mission</h2>
			<p>
				Our mission is to provide high-quality products and services to our customers. We are committed to continuous improvement and strive to exceed our customers' expectations.
			</p>
		</div>
	);
}