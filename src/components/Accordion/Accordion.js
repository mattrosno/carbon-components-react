import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import AccordionSpec from '@carbon/spec/components/accordion/accordion-config.js';

const { prefix } = settings;

const Accordion = ({ children, className, ...other }) => {
  const accordionConfig = AccordionSpec.generate({
    prefix,
  });

  const classNames = classnames(className, `${accordionConfig.classes.root}`);

  return (
    <ul className={classNames} {...accordionConfig.attributes} {...other}>
      {children}
    </ul>
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
