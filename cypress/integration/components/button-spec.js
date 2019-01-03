import 'carbon-components/css/carbon-components.css';
import React from 'react';
import Button from '../../../src/components/Button';
import get from 'lodash.get';
import { mount } from 'cypress-react-unit-test';
import { settings } from 'carbon-components';
import buttonConfig from '@carbon/spec/components/button/button-config.js';
import buttonTest from '@carbon/spec/components/button/button-test.js';

const mountComponent = demo => {
  const { prefix } = settings;
  const config = buttonConfig(prefix);
  const context = get(config.demo, demo, { context: {} }).context;

  const { element, variant, disabled, size, type, href, tabIndex } = context;
  const props = {
    className: 'some-class',
    element,
    kind: variant,
    disabled,
    small: size === 'small',
    type,
    href,
    tabIndex,
  };

  mount(<Button {...props}>{context.content}</Button>);
};

buttonTest(settings.prefix).run(mountComponent);
