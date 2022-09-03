import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputTag from '../InputTags/InputTag';

configure({ adapter: new Adapter() });

describe('<InputTag />', () => {
  test('check of type', () => {
    const wrapper = shallow(<InputTag type={'text'} />);

    const input = wrapper.find('input');
    expect(input.type()).toBe('input');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
