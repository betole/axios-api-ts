import { AxiosRequestConfig } from 'axios';
import {api} from '../../../support/api.ts'
import GraphQLParser from '../../../support/graphQLparser.ts';
import { expect } from 'chai';
import url from '../../../fixtures/github/url.json';

const pathToQuery: string = 'github/graphql/queries/getLoggedUser.graphql';
const query: string = GraphQLParser.fromFixture(pathToQuery);
const bearer = process.env.GH_PAT;

describe.skip(url.graphQL, function() {
  describe('Queries', function() {
    it(query, async function() {
      const config: AxiosRequestConfig<any> = {
        url: url.graphQL,
        method: 'post',
        headers: {
          "Content-type": "application/json",
          "Authorization": `bearer ${bearer}`
        },
        data: {
          query
        }
      }
      const response = await api.request<any>(config);
      expect(response.status).to.eq(200);
      expect(response.data).to.not.have.property('errors');
      expect(response.data).to.have.property('data');
      expect(response.data.data).to.eql({viewer: {login: 'betole'}});
    });
  })
});
