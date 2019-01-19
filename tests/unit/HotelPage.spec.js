import { shallowMount } from '@vue/test-utils';
import HotelPage from '@/views/hotel/HotelPage.vue';
import HotelList from '@/views/hotel/HotelList.vue';
import HotelDetails from '@/views/hotel/HotelDetails.vue';

describe('HotelPage', () => {
  const build = () => {
    const wrapper = shallowMount(HotelPage, {
      data: () => ({
        nightsCount: 1,
      }),
    });
    return {
      wrapper,
      hotelList: () => wrapper.find(HotelList),
      hotelDetails: () => wrapper.find(HotelDetails),
    };
  };

  it('renders the component', () => {
    // arrange
    const { wrapper } = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main child components [List, Details]', () => {
    // arrange
    const { hotelList, hotelDetails } = build();
    // assert
    expect(hotelList().exists()).toBe(true);
    expect(hotelDetails().exists()).toBe(true);
  });

  it('passes a binded nightCounts prop to HotelList component', () => {
    // arrange
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { wrapper, hotelList } = build();
    wrapper.setData({
      nightsCount: 1,
    });
    // assert
    expect(hotelList().vm.nightsCount).toBe(wrapper.vm.nightsCount);
    expect(wrapper.vm.nightsCount).not.toBeUndefined();
    expect(wrapper.vm.nightsCount).toBeDefined();
    expect(wrapper.vm.nightsCount).toBeTruthy();
    expect(days).toContain(wrapper.vm.nightsCount);
  });

  it('recieve the value of nightsCount from @updateNightCount event from hotelDetails', () => {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { wrapper, hotelDetails } = build();
    hotelDetails().vm.$emit('updateNightCount', 5);
    expect(days).toContain(wrapper.vm.nightsCount);
  });
});
