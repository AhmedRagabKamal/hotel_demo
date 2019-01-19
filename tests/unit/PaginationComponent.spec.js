import { mount } from '@vue/test-utils';
import Pagination from '@/shared/components/PaginationComponent.vue';
// import sinon from 'sinon';

describe('Pagination', () => {
  const build = () => {
    const wrapper = mount(Pagination, {
      propsData: {
        perPage: 3,
        totalRows: 20,
        reviews: [],
      },
    });
    return {
      wrapper,
    };
  };

  it('renders the Pagination component', () => {
    // arrange
    const { wrapper } = build();
    // assert
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.html()).toContain('<nav aria-label="Page navigation example">');
  });

  it('has a button', () => {
    const { wrapper } = build();
    expect(wrapper.contains('li.page-item')).toBe(true);
  });

  it('pagination button click should increment the page number', () => {
    const { wrapper } = build();
    expect(wrapper.vm.pageNumber).toBe(0);
    const button = wrapper.find('button.next');
    button.trigger('click');
    expect(wrapper.vm.pageNumber).toBe(1);
  });
});
