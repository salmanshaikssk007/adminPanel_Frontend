import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button/Button';

configure({ adapter: new Adapter() });

describe('<Button />', () => {
  test('test props as children', () => {
    const wrapper = shallow(<Button>children</Button>);
    expect(wrapper.text()).toBe('children');

    const button = wrapper.find('button');
    expect(button.type()).toBe('button');

    expect(wrapper).toMatchSnapshot();
  });
});
