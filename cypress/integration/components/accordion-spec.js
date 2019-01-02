import 'carbon-components/css/carbon-components.css';
import React from 'react';
import Accordion from '../../../src/components/Accordion';
import AccordionItem from '../../../src/components/AccordionItem';
import { mount } from 'cypress-react-unit-test';
import { settings } from 'carbon-components';
import accordionConfig from '@carbon/spec/components/accordion/accordion-config.js';
import accordionTest from '@carbon/spec/components/accordion/accordion-test.js';

const mountComponent = () => {
  const { prefix } = settings;
  const config = accordionConfig(prefix);
  const context = config.demo.variants.default.context;

  mount(
    <Accordion>
      {context.sections.map(function(item) {
        return (
          <AccordionItem
            className="some-class"
            title={item.title.content}
            open={item.active}
            id={item.paneId}>
            <p>{item.content.content}</p>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

accordionTest(settings.prefix).run(mountComponent);
