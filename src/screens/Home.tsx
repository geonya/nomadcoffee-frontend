import { useReactiveVar } from "@apollo/client";
import { darkModeVar, logUserOut, toggleDarkMode } from "../apollo";

export default function Home() {
	const darkMode = useReactiveVar(darkModeVar);
	return (
		<div>
			<button onClick={() => toggleDarkMode(darkMode)}>
				{darkMode ? "Light Mode" : "Dark Mode"}
			</button>
			<button onClick={logUserOut}>Log Out</button>
		</div>
	);
}
