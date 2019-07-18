import Vue from 'vue';
import { value } from 'vue-function-api';
import usePrevious from '../usePrevious';
import renderHook from '../util/renderHook';

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  it('should be previous count', () => {
    renderHook(() => {
      const count = value(0);
      const prevCount = usePrevious(count);

      expect(count.value).toBe(0);
      expect(prevCount.value).toBeUndefined();

      count.value += 1;

      Vue.nextTick().then(() => {
        expect(count.value).toBe(1);
        expect(prevCount.value).toBe(0);

        count.value -= 1;

        Vue.nextTick().then(() => {
          expect(count.value).toBe(0);
          expect(prevCount.value).toBe(1);
        });
      });
    });
  });
});