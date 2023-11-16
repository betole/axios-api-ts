import { AxiosRequestConfig } from 'axios';
import {api} from '../../../support/api.ts'
import { expect } from 'chai';
import url from '../../../fixtures/github/url.json';
import headers from '../../../fixtures/github/headers.json';

const bearer = process.env.GH_PAT;
const apiVersion = process.env.GH_API_VERSION;
const repo = 'axios-api-ts';
const owner = process.env.GH_OWNER;

describe(url.rest.repos.codeFrequency, function() {
  describe('GET', function() {
    it(repo, async function() {
      const config: AxiosRequestConfig<any> = {
        url: url.rest.repos.codeFrequency.replace('{owner}', owner).replace('{repo}', repo),
        method: 'get',
        headers: {
          "Accept": headers.accept['vnd.github+json'],
          "X-GitHub-Api-Version": apiVersion,
          "Authorization": `bearer ${bearer}`
        },
      }
      const response = await api.request<any>(config);
      expect(response.status).to.eq(200);
      expect(response.data, 'Response body is a non-empty array')
        .to.be.an('array')
        .that.is.not.empty;
      expect(response.data[0], 'First item in collection is an array of 3 numbers')
        .to.be.an('array')
        .that.has.lengthOf(3);
      response.data[0].forEach((item: any) => expect(item).to.be.a('number'));
    });
  })
});
