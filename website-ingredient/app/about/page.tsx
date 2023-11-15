import { title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div>
			<h1 className={title()}>About Us</h1>

			<p>
				Learn more about our company, our team, and our mission.
			</p>
			<br></br>
			<h2><b>Meet the Team</b></h2>
			<ul>
				<li>Jack Berkowitz - Front end </li>
				<li>John Costa - Front end </li>
				<li>Dima Bezborodov - AWS developer</li>
				<li>Andrew Catapano - Back end </li>
			</ul>
			<br></br>
			<h2><b>Our Mission</b></h2>
			<p>
				Our mission is to provide high-quality products and services to our customers. We are committed to continuous improvement and strive to exceed our customers&apos; expectations.
			</p>
		</div>
	);
}