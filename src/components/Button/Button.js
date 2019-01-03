import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import classNames from 'classnames';
import { oneOf } from 'prop-types';
import { settings } from 'carbon-components';
import buttonConfig from '@carbon/spec/components/button/button-config.js';

const { prefix } = settings;
const config = buttonConfig(prefix);
const ButtonTypes = {
  buttonKind: oneOf(Object.keys(config.selectors.variants)),
};

const Button = ({
  children,
  className,
  disabled,
  element,
  small,
  kind,
  tabIndex,
  type,
  icon,
  iconDescription,
  ...other
}) => {
  const buttonConfig = config.generate({
    content: children,
    disabled,
    element,
    icon,
    prefix,
    size: small ? 'small' : '',
    tabIndex,
    type,
    variant: kind,
  });

  const Element = `${buttonConfig.element}`;
  const commonProps = {
    tabIndex: buttonConfig.tabIndex,
    className: classNames(className, `${buttonConfig.classes.root}`),
  };

  const buttonImage = icon ? (
    <Icon
      icon={Object(icon) === icon ? icon : undefined}
      name={Object(icon) !== icon ? icon : undefined}
      description={iconDescription}
      className={`${prefix}--btn__icon`}
    />
  ) : null;

  return (
    <Element
      {...other}
      {...commonProps}
      {...buttonConfig.attributes}
      ref={other.inputref}>
      {children}
      {buttonImage}
    </Element>
  );
};

Button.propTypes = {
  /**
   * Specify the content of your Button
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Button
   */
  className: PropTypes.string,

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the button is a button or anchor
   */
  element: PropTypes.string,

  /**
   * Specify whether the Button should be a small variant
   */
  small: PropTypes.bool,

  /**
   * Specify the kind of Button you want to create
   */
  kind: ButtonTypes.buttonKind.isRequired,

  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  href: PropTypes.string,

  /**
   * Optional prop to specify the tabIndex of the Button
   */
  tabIndex: PropTypes.number,

  /**
   * Optional prop to specify the type of the Button
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),

  /**
   * Optional prop to specify the role of the Button
   */
  role: PropTypes.string,

  /**
   * Specify an icon to include in the Button through a string or object
   * representing the SVG data of the icon
   */
  icon: PropTypes.oneOfType([
    PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      viewBox: PropTypes.string.isRequired,
      svgData: PropTypes.object.isRequired,
    }),
    PropTypes.string,
  ]),

  /**
   * If specifying the `icon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: props => {
    if (props.icon && !props.iconDescription) {
      return new Error(
        'icon property specified without also providing an iconDescription property.'
      );
    }
    return undefined;
  },
};

// TODO SPEC better way to get default props from spec?
const defaultButton = config.generate();

Button.defaultProps = {
  iconDescription: 'Provide icon description if icon is used',
  tabIndex: defaultButton.tabIndex,
  type: defaultButton.type,
  disabled: defaultButton.disabled,
  small: defaultButton.size === 'small',
  kind: defaultButton.variant,
};

export default Button;
