import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { iconChevronRight } from 'carbon-icons';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import accordionConfig from '@carbon/spec/components/accordion/accordion-config.js';

const { prefix } = settings;

const defaultRenderExpando = props => <button {...props} />;

export default class AccordionItem extends Component {
  state = {
    id: this.props.id,
    open: this.props.open,
  };

  static propTypes = {
    /**
     * Provide the contents of your AccordionItem
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify an id for each item
     */
    id: PropTypes.string,

    /**
     * The accordion title.
     */
    title: PropTypes.node,

    /**
     * The callback function to render the expando button.
     * Can be a React component class.
     */
    renderExpando: PropTypes.func,

    /**
     * The description of the expando icon.
     */
    iconDescription: PropTypes.string,

    /**
     * `true` to open the expando.
     */
    open: PropTypes.bool,

    /**
     * The handler of the massaged `click` event.
     */
    onClick: PropTypes.func,

    /**
     * The handler of the massaged `click` event on the heading.
     */
    onHeadingClick: PropTypes.func,
  };

  static defaultProps = {
    title: 'Title',
    renderExpando: defaultRenderExpando,
    iconDescription: 'Expand/Collapse',
    open: false,
    onClick: () => {},
    onHeadingClick: () => {},
  };

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  handleClick = evt => {
    this.props.onClick(evt);
  };

  handleHeadingClick = evt => {
    const open = !this.state.open;
    this.setState({ open });
    this.props.onHeadingClick({ isOpen: open, event: evt });
  };

  handleKeyDown = evt => {
    const isKeyPressTarget = evt.target === evt.currentTarget;
    const isValidKeyPress = [13, 32].indexOf(evt.which) !== -1;

    if (isKeyPressTarget && isValidKeyPress) {
      evt.stopPropagation();
      evt.preventDefault();
      this.handleHeadingClick(evt);
    }
  };

  render() {
    const {
      className,
      title,
      renderExpando: Expando,
      iconDescription,
      children,
      onClick, // eslint-disable-line no-unused-vars
      onHeadingClick, // eslint-disable-line no-unused-vars
    } = this.props;

    const config = accordionConfig(prefix);

    const accordionItem = config.generateItem({
      active: this.state.open,
      paneId: this.state.id,
    });

    const Element = `${accordionItem.element}`;
    const classNames = classnames(className, `${accordionItem.classes.item}`);

    return (
      <Element
        className={classNames}
        onClick={this.handleClick}
        {...accordionItem.attributes}>
        <Expando
          className={accordionItem.classes.heading}
          onClick={this.handleHeadingClick}
          onKeyDown={this.handleKeyDown}
          {...accordionItem.heading.attributes}>
          <Icon
            className={accordionItem.classes.icon}
            icon={iconChevronRight}
            description={iconDescription}
          />
          <div className={accordionItem.classes.title}>{title}</div>
        </Expando>
        <div
          className={accordionItem.classes.content}
          {...accordionItem.content.attributes}>
          {children}
        </div>
      </Element>
    );
  }
}
