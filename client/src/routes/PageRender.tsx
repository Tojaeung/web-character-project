import { createElement } from 'react';
import { useParams } from 'react-router-dom';

export const AuthPageRender = () => {
  const { page } = useParams();

  if (!page) return <h1>나다호다</h1>;

  const modifiedPage = page?.charAt(0).toUpperCase() + page?.slice(1);

  const component = () => require(`../pages/auth/${modifiedPage}`).default;

  try {
    return createElement(component());
  } catch (err) {
    return <h1>나다호다</h1>;
  }
};

export const SettingsPageRender = () => {
  const { page } = useParams();

  if (!page) return <h1>나다호다</h1>;

  const modifiedPage = page?.charAt(0).toUpperCase() + page?.slice(1);

  const component = () => require(`../pages/settings/${modifiedPage}`).default;

  try {
    return createElement(component());
  } catch (err) {
    return <h1>나다호다</h1>;
  }
};
