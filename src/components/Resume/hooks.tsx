import { useContent } from '@/hooks/useContent';
import { kebabCase, snakeCase, startCase } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { ResumeCategories } from '../../types';
import ResumeTimeline from './ResumeTimeline';

export const useCreateResumeTimeline = (category: ResumeCategories) => {
  const { t } = useContent('resume');
  const [title, setTitle] = useState('');
  const [categoryItems, setCategoryItems] = useState(<></>);

  useEffect(() => {}, []);

  const createTimelineSection = useCallback(() => {
    return <ResumeTimeline details={JSON.stringify(t(category, { returnObjects: true }))} category={category} />;
  }, [category, t]);

  useEffect(() => {
    setTitle(startCase(category));
    setCategoryItems(createTimelineSection());
  }, [category]);

  return { title, categoryItems };
};

export const useResumeContent = (category: ResumeCategories, resumeItem: string) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [team, setTeam] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const url = `/src/assets/${snakeCase(category)}.json`;
    fetch(url)
      .then((res) => res.json())
      .then((content) => {
        const json = JSON.parse(JSON.stringify(content));

        switch (category) {
          case ResumeCategories.employmentHistory:
            setTitle(json[kebabCase(resumeItem)].title);
            setSubtitle(json[kebabCase(resumeItem)].company);
            setDate(json[kebabCase(resumeItem)].start_date + ' - ' + json[kebabCase(resumeItem)].end_date);
            setDescription(json[kebabCase(resumeItem)].description);
            setTeam(json[kebabCase(resumeItem)].team);
            setUrl('');
            break;
          case ResumeCategories.education:
            setTitle(json[kebabCase(resumeItem)].school);
            setSubtitle(json[kebabCase(resumeItem)].qualification);
            setDate(json[kebabCase(resumeItem)].start_date + ' - ' + json[kebabCase(resumeItem)].end_date);
            setDescription(json[kebabCase(resumeItem)].description);
            setTeam('');
            setUrl('');

            break;
          case ResumeCategories.certifications:
            setTitle(json[kebabCase(resumeItem)].name);
            setSubtitle(json[kebabCase(resumeItem)].certifier);
            setDate(json[kebabCase(resumeItem)].date);
            setDescription(json[kebabCase(resumeItem)].description);
            setTeam('');
            setUrl(json[kebabCase(resumeItem)].url);
            break;
          default:
            setTitle('');
            setSubtitle('');
            setDate('');
            setDescription('');
            setTeam('');
            setUrl('');

            break;
        }
      })
      .catch((error) => console.error(error));
  }, [category]);

  return { title, subtitle, description, date, team, url };
};
