import axios from 'axios';
import useSearchResults from './useSearchResults';
import { renderHook } from '@testing-library/react-hooks';
import searchResponse from '../modules/search/mocks/search-response.json';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const malformedResponse = { data: {} };

const emptyQuery = { query: {} };

const emptyToken = { token: undefined };
const dummyToken = { token: 'xyz' };

describe('useSearchResult', () => {
  it('should return empty array on first render', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSearchResults(emptyQuery, emptyToken));

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
  });

  it('should return empty array on malformed response', async () => {
    mockedAxios.post.mockResolvedValue(malformedResponse);

    const { result, waitForNextUpdate } = renderHook(() => useSearchResults(emptyQuery, dummyToken));

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
  });

  it('should return array of three projects', async () => {
    mockedAxios.post.mockResolvedValue({ data: searchResponse });

    const { result, waitForNextUpdate } = renderHook(() => useSearchResults(emptyQuery, dummyToken));

    await waitForNextUpdate();

    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(3);
  });
});
