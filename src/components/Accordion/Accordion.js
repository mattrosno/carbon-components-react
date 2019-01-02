import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import accordionConfig from '@carbon/spec/components/accordion/accordion-config.js';

const { prefix } = settings;

const Accordion = ({ children, className, ...other }) => {
  const config = accordionConfig(prefix);
  const accordion = config.generate();

  const Element = `${accordion.element}`;
  const classNames = classnames(className, `${accordion.classes.root}`);

  return (
    <Element className={classNames} {...accordion.attributes} {...other}>
      {children}
    </Element>
  );
};

Accordion.propTypes = {
  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
};

export default Accordion;
