import { shallowMount } from '@vue/test-utils';
import HotelList from '@/views/hotel/HotelList.vue';
import HotelListItem from '@/views/hotel/HotelListItem.vue';

describe('HotelList', () => {
  const build = () => {
    const wrapper = shallowMount(HotelList, {
      propsData: {
        nightsCount: 1,
      },
    });
    return {
      wrapper,
      hotelListItem: () => wrapper.find(HotelListItem),
    };
  };

  it('HotelList render ok', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders main child component HotelListItem', () => {
    // arrange
    const { hotelListItem } = build();
    // assert
    expect(hotelListItem().exists()).toBe(true);
  });

  // it('passes a binded nightCounts prop to HotelListItem component', () => {
  //   // arrange
  //   const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   const { wrapper, hotelListItem } = build();
  //   wrapper.setData({
  //     nightsCount: 1,
  //   });
  //   // assert
  //   expect(hotelListItem().vm.nightsCount).toBe(wrapper.vm.nightsCount);
  //   expect(wrapper.vm.nightsCount).not.toBeUndefined();
  //   expect(wrapper.vm.nightsCount).toBeDefined();
  //   expect(wrapper.vm.nightsCount).toBeTruthy();
  //   expect(days).toContain(wrapper.vm.nightsCount);
  // });


});
