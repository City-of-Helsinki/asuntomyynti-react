import { useHistory } from 'react-router-dom';
import React from 'react';
import useQuery from '../../hooks/useQuery';
import Checkbox from '../Checkbox';
import Label from '../Label/Label';
import { SearchItem } from '../../hooks/useConfig';

type Props = {
  name: string;
  items: (string | SearchItem)[];
};

/**
 * List options that correspond to the query params
 */
const QueryList = ({ name, items }: Props) => {
  const searchParams = useQuery();
  const history = useHistory();

  const getQueryParams = (key: string, value: string) => {
    const searchParamsCopy = new URLSearchParams(searchParams);

    if (searchParamsCopy.getAll(key).includes(value)) {
      const currentSet = searchParamsCopy.getAll(name);
      searchParamsCopy.delete(name);
      currentSet.forEach((a) => a !== value && searchParamsCopy.append(key, a));
    } else {
      searchParamsCopy.append(key, value);
    }

    return `?${searchParamsCopy.toString()}`;
  };

  return (
    <div>
      {items.map((item) => {
        if (typeof item === 'string') {
          return (
            <Label key={item}>
              <Checkbox
                onChange={() => history.push(getQueryParams(name, item))}
                checked={searchParams.getAll(name).includes(item)}
              />
              <div>{item}</div>
            </Label>
          );
        }
        return (
          <label>
            {item.label}
            <input name={name} placeholder={item.placeholder} />
          </label>
        );
      })}
    </div>
  );
};

export default QueryList;
