import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "@/components/HomeHeader";
import PageLayout from "@/components/PageLayout";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Resume from "./Resume";

const Home = () => {
	const location = useLocation();
	const [showMainContent, setShowMainContent] = useState(
		location.hash === "#aboutMe",
	);

	useEffect(() => {
		if (location.hash === "#aboutMe") {
			setShowMainContent(true);
		}
	}, [location.hash]);

	useEffect(() => {
		if (!showMainContent || location.hash !== "#aboutMe") {
			return;
		}

		const t = window.setTimeout(() => {
			document
				.getElementById("aboutMe")
				?.scrollIntoView({ behavior: "smooth", block: "start" });
		}, 0);

		return () => window.clearTimeout(t);
	}, [location.hash, showMainContent]);

	const handleLearnMore = () => {
		setShowMainContent(true);

		if (window.location.hash !== "#aboutMe") {
			window.history.replaceState(
				null,
				"",
				`${window.location.pathname}#aboutMe`,
			);
		}
	};

	if (!showMainContent) {
		return (
			<PageLayout onlyShowChildren>
				<HomeHeader onLearnMore={handleLearnMore} />
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			<div className="layout-stack flex w-full flex-col">
				<HomeHeader />
				<AboutMe />
				<Projects />
				<Resume />
			</div>
		</PageLayout>
	);
};

export default Home;
