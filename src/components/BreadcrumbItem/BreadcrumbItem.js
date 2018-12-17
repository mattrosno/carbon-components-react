import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import Link from '../Link';
import BreadcrumbSpec from '@carbon/spec/components/breadcrumb/breadcrumb-config.js';

const { prefix } = settings;

const breadcrumbItemConfig = BreadcrumbSpec.generate.generateBreadcrumbItem({
  prefix,
});

const newChild = (children, href, prefix) => {
  if (typeof children === 'string' && !(href === undefined)) {
    return <Link href={href}>{children}</Link>;
  } else {
    return React.cloneElement(React.Children.only(children), {
      className: `${prefix}--link`,
    });
  }
};

const BreadcrumbItem = ({ children, className, href, ...other }) => {
  const classNames = classnames(
    `${breadcrumbItemConfig.classes.item}`,
    className
  );
  return (
    <div className={classNames} {...other}>
      {newChild(children, href, prefix)}
    </div>
  );
};

BreadcrumbItem.propTypes = {
  /**
   * Pass in content that will be inside of the BreadcrumbItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href: PropTypes.string,
};

export default BreadcrumbItem;
