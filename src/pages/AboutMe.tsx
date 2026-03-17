import { useEffect } from "react";
import { Container } from "react-bootstrap";
import aboutImg from "@/assets/about.jpg";
import Markdown from "@/components/Markdown";
import { usePageLayout } from "@/components/PageLayout";
import { useContent } from "@/hooks/useContent";
import type { CONTENT_KEYS } from "@/services/content/i18n";
import type { PageProps } from "@/types";

const DEFAULT_SECTION_ID = "aboutMe";
const DEFAULT_TITLE = "About Me";

const AboutMe = ({
	sectionId = DEFAULT_SECTION_ID,
	title = DEFAULT_TITLE,
}: PageProps) => {
	const { setLoaded } = usePageLayout();
	const { t } = useContent(sectionId as CONTENT_KEYS);

	useEffect(() => setLoaded(true), [setLoaded]);

	return (
		<Container fluid="lg" className="page-section" id={sectionId}>
			<h1 className="type-display uppercase">{title}</h1>
			<h2 className="type-heading">{t("tagline")}</h2>
			<div className="page-section-content">
				<img src={aboutImg} alt={title} className="page-section-media" />
				<div className="page-section-copy">
					<Markdown source={t("blurb")} />
				</div>
			</div>
		</Container>
	);
};

export default AboutMe;
