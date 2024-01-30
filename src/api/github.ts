import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import type { NormalizedCacheObject } from "@apollo/client/core";
import { OrgIdDocument, OrgIdQuery, OrgIdQueryVariables } from "../generated/gql/graphql.js";

export class GitHubAPI {
  private token : string;

  constructor(token: string) {
    this.token = token;
  }

  githubClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
      link: new HttpLink({
        uri: "https://api.github.com/graphql",
        headers: {
          'authorization': `token ${this.token}`,
          'X-Github-Next-Global-ID': '1'
        },
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  }

  async getOrgId(owner: string) : Promise<string> {
    const variables = {
      'org': owner
    }

    return this.githubClient().query<OrgIdQuery, OrgIdQueryVariables>({
      query: OrgIdDocument, 
      variables: variables
    }).then((result) => {
      if (!result.data.organization?.id) {
        throw new Error(`Failed to retrieve organization ${owner}`); 
      }
      
      return result.data.organization.id;
    });
  }

}