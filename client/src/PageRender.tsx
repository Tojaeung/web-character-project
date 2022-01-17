import React, { createElement } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '@src/components/NotFound';

const PageRender = () => {
  const { page, id } = useParams();
  console.log(page);
  console.log(id);

  let name = '';

  if (page) {
    name = id ? `${page}/[id]` : `${page}`;
  }
  console.log(name);

  return generatePage(name);
};

const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default;

  try {
    return createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

export default PageRender;
