import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import useFilters from './useFilters';

const createWrapper = (history: ReturnType<typeof createMemoryHistory>) => {
  const Wrapper: React.FC = ({ children }) =>
    React.createElement(Router, { history }, children);
  return Wrapper;
};

describe('useFilters', () => {
  it('should not add new history entries when setting a filter', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useFilters(), {
      wrapper: createWrapper(history),
    });

    const initialLength = history.length;

    act(() => {
      result.current.setFilter('room_count', '1');
    });

    expect(history.length).toBe(initialLength);
  });

  it('should not add new history entries across multiple filter operations', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useFilters(), {
      wrapper: createWrapper(history),
    });

    const initialLength = history.length;

    act(() => {
      result.current.setFilter('room_count', '1');
    });
    act(() => {
      result.current.setFilter('room_count', '1,2');
    });
    act(() => {
      result.current.addFilter('living_area', '50,80');
    });
    act(() => {
      result.current.clearFilter('room_count');
    });

    expect(history.length).toBe(initialLength);
  });

  it('should not add new history entries when removing a filter value', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useFilters(), {
      wrapper: createWrapper(history),
    });

    act(() => {
      result.current.setFilter('room_count', '1,2,3');
    });

    const lengthAfterSet = history.length;

    act(() => {
      result.current.removeFilter('room_count', '2');
    });

    expect(history.length).toBe(lengthAfterSet);
  });

  it('should not add new history entries when clearing all filters', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useFilters(), {
      wrapper: createWrapper(history),
    });

    act(() => {
      result.current.setFilter('room_count', '1');
    });
    act(() => {
      result.current.setFilter('living_area', '50,80');
    });

    const lengthBeforeClear = history.length;

    act(() => {
      result.current.clearAllFilters({
        room_count: {} as any,
        living_area: {} as any,
      });
    });

    expect(history.length).toBe(lengthBeforeClear);
  });

  it('should still update the URL query string when filters change', () => {
    const history = createMemoryHistory();
    const { result } = renderHook(() => useFilters(), {
      wrapper: createWrapper(history),
    });

    act(() => {
      result.current.setFilter('room_count', '2');
    });

    expect(history.location.search).toBe('?room_count=2');

    act(() => {
      result.current.clearFilter('room_count');
    });

    expect(history.location.search).toBe('');
  });
});
