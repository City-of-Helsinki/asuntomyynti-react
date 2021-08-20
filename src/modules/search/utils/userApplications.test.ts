import { userHasApplications, getUserApplications } from './userApplications';

const mockUserConfig = {
  user_id: '0',
  email_address: null,
  username: '',
  applications: {
    20: [5, 7, 9, 12, 15],
  },
};

test('userHasApplications returns false if user is not given', () => {
  const result = userHasApplications(undefined, 0);
  expect(result).toBe(false);
});

test('userHasApplications has applications to the given project id', () => {
  const result = userHasApplications(mockUserConfig, 20);
  expect(result).toBe(true);
});

test('userHasApplications does not have applications to the given project id', () => {
  const result = userHasApplications(mockUserConfig, 10);
  expect(result).toBe(false);
});

test('getUserApplications returns undefined if user is not given', () => {
  const result = getUserApplications(undefined, 0);
  expect(result).toBeUndefined();
});

test('getUserApplications returns applications for the given project id', () => {
  const result = getUserApplications(mockUserConfig, 20);
  expect(result).toEqual([5, 7, 9, 12, 15]);
});

test('getUserApplications returns undefined if there are no applications to the given project id', () => {
  const result = getUserApplications(mockUserConfig, 10);
  expect(result).toBeUndefined();
});
