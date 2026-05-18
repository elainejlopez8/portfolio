'use client';

import aboutImg from '@/assets/about.jpg';
import { usePageLayout } from '@/components/PageLayout';
import type { AboutMeContent } from '@/payload/types';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

type TerminalBlurbEntry = {
  command: string;
  output: string;
};

const splitTerminalOutput = (output: string) => output.split('\n');

type Props = {
  sectionId?: string;
  title?: string;
  aboutMeContent: AboutMeContent;
};

const AboutMe = ({ sectionId = 'aboutMe', title = 'About Me', aboutMeContent }: Props) => {
  const { setLoaded } = usePageLayout();
  const blurb: TerminalBlurbEntry[] = Array.isArray(aboutMeContent.blurb) ? aboutMeContent.blurb : [];

  useEffect(() => setLoaded(true), [setLoaded]);

  return (
    <Container fluid='lg' className='page-section about-terminal-section' id={sectionId}>
      <div className='about-terminal-window'>
        <div className='about-terminal-header'>
          <div className='about-terminal-controls' aria-hidden='true'>
            <span className='about-terminal-dot about-terminal-dot--close' />
            <span className='about-terminal-dot about-terminal-dot--minimise' />
            <span className='about-terminal-dot about-terminal-dot--expand' />
          </div>
          <p className='about-terminal-tab'>{aboutMeContent.terminalTab}</p>
        </div>

        <div className='about-terminal-body'>
          <p className='about-terminal-line'>
            <span className='about-terminal-prompt'>{aboutMeContent.terminalPrefix}</span>{' '}
            {aboutMeContent.terminalCommand1}
          </p>

          <h1 className='type-display about-terminal-title uppercase'>{title}</h1>
          <h2 className='type-heading about-terminal-tagline'>{aboutMeContent.tagline}</h2>

          <div className='page-section-content about-terminal-content'>
            <img src={aboutImg.src} alt={title} className='page-section-media about-terminal-media' />
            <div className='page-section-copy about-terminal-copy'>
              <p className='about-terminal-line about-terminal-line--command'>
                <span className='about-terminal-prompt'>{aboutMeContent.terminalPrefix}</span>{' '}
                {aboutMeContent.terminalCommand2}
              </p>
              {blurb.map((entry) => (
                <div key={entry.command} className='about-terminal-entry'>
                  <p className='about-terminal-line about-terminal-line--command'>
                    <span className='about-terminal-prompt'>{aboutMeContent.terminalPrefix}</span>
                    <span className='about-terminal-command'>{entry.command}</span>
                  </p>
                  <div className='about-terminal-response'>
                    {splitTerminalOutput(entry.output).map((line, index) =>
                      line ? (
                        <p key={`${entry.command}-${index}`} className='about-terminal-output-line'>
                          {line}
                        </p>
                      ) : (
                        <div
                          key={`${entry.command}-${index}`}
                          className='about-terminal-output-spacer'
                          aria-hidden='true'
                        />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className='about-terminal-line about-terminal-line--cursor'>
            <span className='about-terminal-prompt'>{aboutMeContent.terminalPrefix}</span>
            <span className='about-terminal-cursor' aria-hidden='true' />
          </p>
        </div>
      </div>
    </Container>
  );
};

export default AboutMe;
