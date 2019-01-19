import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HotelListItem from '@/views/hotel/HotelListItem.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Actions.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      getHotelDetails: jest.fn(),
    };
    store = new Vuex.Store({
      state: {},
      actions,
    });
  });

  const build = () => {
    const wrapper = shallowMount(HotelListItem, {
      store,
      localVue,
      propsData: {
        hotel: {},
        nightsCount: 1,
      },
    });
    return {
      wrapper,
    };
  };

  it('render component', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // it('dispatches "getHotelDetails" when button is clicked', () => {
  //   const { wrapper } = build();
  //   const button = wrapper.find('button');
  //   button.trigger('click');
  //   expect(actions.getHotelDetails).toHaveBeenCalled();
  // });
});
