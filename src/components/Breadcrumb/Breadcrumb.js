import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import BreadcrumbSpec from '@carbon/spec/components/breadcrumb/breadcrumb-config.js';

const { prefix } = settings;

const Breadcrumb = ({ children, className, noTrailingSlash, ...other }) => {
  const breadcrumbConfig = BreadcrumbSpec.generate({
    noTrailingSlash,
    prefix,
  });

  const classNames = classnames(className, `${breadcrumbConfig.classes.root}`);

  return (
    <div className={classNames} {...breadcrumbConfig.attributes} {...other}>
      {children}
    </div>
  );
};

Breadcrumb.propTypes = {
  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,
};

export default Breadcrumb;
