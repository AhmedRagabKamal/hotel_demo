import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HotelList from '@/views/hotel/HotelList.vue';
import HotelListItem from '@/views/hotel/HotelListItem.vue';
import initialState from '@/store/modules/hotel-store/state';
import hotelsFixture from './fixtures/hotels';
// import actions from '@/store/modules/hotel-store/actions';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('HotelList', () => {
  let state;
  let actions;

  const build = () => {
    const wrapper = mount(HotelList, {
      propsData: {
        nightsCount: 1,
      },
      localVue,
      store: new Vuex.Store({ state, actions }),
      methods: {
        created: () => {
          this.store.dispatch('hotel/getHotels');
        },
      },
    });
    return {
      wrapper,
      hotelListItem: () => wrapper.find(HotelListItem),
    };
  };

  beforeEach(() => {
    actions = {
      getHotels: jest.fn(),
    };
    state = { ...initialState };
  });

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  // it('dispatches "getHotels" when component created', () => {
  //   const { wrapper } = build();
  //   wrapper.vm.created();
  //   expect(actions.getHotels).toHaveBeenCalled();
  // });


  // it('get hotels data from state of  hotel-store', () => {
  //   // arrange
  //   const { wrapper } = build();
  //   state.hotels = hotelsFixture;
  //   // assert
  //   expect(wrapper.vm.hotels).toBe(state.hotels);
  // });
});
