import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from '../Card/Card';

configure({ adapter: new Adapter() });

describe('<Card />', () => {
  test('testing children', () => {
    const wrapper = shallow(<Card>children</Card>);
    expect(wrapper.text()).toBe('children');

    expect(wrapper).toMatchSnapshot();
  });
});
