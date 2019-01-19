// mutations.spec.js
import mutations from '@/store/modules/hotel-store/mutations';
import hotelsFixture from './fixtures/hotels';

// destructure assign `mutations`
const { updateHotels, updateHotelDetails } = mutations;

describe('mutations', () => {
  it('update the hotels state', () => {
    // mock state
    const state = { hotels: [] };
    // apply mutation
    updateHotels(state, hotelsFixture);
    // assert result
    expect(state.hotels).toEqual(hotelsFixture);
  });

  it('update the hotelDetails object state', () => {
    // mock state
    const state = { hotelDetails: {} };
    // apply mutation
    updateHotelDetails(state, hotelsFixture[0]);
    // assert result
    expect(state.hotelDetails).toEqual(hotelsFixture[0]);
  });
});
