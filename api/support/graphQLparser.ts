import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

export default class GraphQLParser {
  public static fromFixture(location: string) {
    const path = resolve(process.cwd(), 'api', 'fixtures', location);
    const parsedGraphQL: string = readFileSync(path, 'utf-8').replace(/\s+/g, ' ');
    return parsedGraphQL;
  }
}
