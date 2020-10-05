import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from './result/SearchResults';
import SearchForm from './form/SearchForm';
import Notification from '../../common/notification/Notification';
import useLang from '../../hooks/useLang';

const SearchContainer = () => {
  const [searchResults, setSearchResults] = useState([]);
  useLang();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await axios.post('http://dev.asuntomyynti-elastic.druidfi.wod.by/_search', {
          collapse: {
            field: 'project_id',
            "inner_hits": {
              "size": 666,
              name: "project_id"
            },
          },
        });
        setSearchResults(data?.data?.hits?.hits.map(mapSearchResults) || []);
      } catch (e) {
        // TODO
      }
    };
    fetchProjects();
  }, []);

  const mapSearchResults = (result: any) => {
    const hits = result.inner_hits.project_id.hits.hits;
    const firstHit = hits[0]._source;

    const project: any = {};

    // Maps the Project entity
    Object.keys(firstHit).forEach((x: string) => {
      if (x.includes('project_')) {
        const key = x.split('project_')[1];
        project[key] = firstHit[x];
      }
    });

    project.apartments = hits.map((x: any) => x._source);
    return project;
  }

  return (
    <div>
      <SearchForm />
      <Notification
        message={
          'Duis ante tortor, dignissim vitae finibus at, pellentesque eget risus. Etiam nec mi ut lorem feugiat blandit nec a quam. Praesent luctus felis sit amet arcu imperdiet suscipit. Cras consectetur eros non lectus volutpat, sit amet ultricies nisi pellentesque. Mauris nec augue nec neque faucibus eleifend quis eu lacus.'
        }
      />
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchContainer;
