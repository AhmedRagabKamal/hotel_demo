import { mount } from '@vue/test-utils';
import HotelDetails from '@/views/hotel/HotelDetails.vue';
import Pagination from '@/shared/components/PaginationComponent.vue';

describe('HotelDetails', () => {
  const build = () => {
    const wrapper = mount(HotelDetails);
    return {
      wrapper,
      pagination: () => wrapper.find(Pagination),
    };
  };

  it('HotelDetails render successfully', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
