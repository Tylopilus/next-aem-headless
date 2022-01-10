import { HeroModel as THeroModel } from '../utils/types';

export const HeroModel = ({ section }: { section: THeroModel }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: section.description!.html! }} />
  );
};
