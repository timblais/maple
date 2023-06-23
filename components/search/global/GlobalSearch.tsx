import {
  Hits,
  InstantSearch,
  SearchBox,
  useInstantSearch
} from "@alexjball/react-instantsearch-hooks-web"
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter"
import { Col, Row } from "../../bootstrap"
import { NoResults } from "./../NoResults"
import { SearchContainer } from "./../SearchContainer"
import { SearchErrorBoundary } from "./../SearchErrorBoundary"
import { getServerConfig } from "./../common"
import { useRouting } from "./../useRouting"
import { GlobalSearchHits } from "./GlobalSearchHits"

const searchClient = new TypesenseInstantSearchAdapter({
  server: getServerConfig(),
  additionalSearchParameters: {
    query_by: "number,title,body",
    exclude_fields: "body"
  }
}).searchClient

export const GlobalSearch = () => (
  <SearchErrorBoundary>
    <InstantSearch
      indexName="bills/sort/_text_match:desc,testimonyCount:desc"
      // initialUiState={{
      //   [initialSortByValue]: {
      //     refinementList: { court: [String(currentGeneralCourt)] }
      //   }
      // }}
      searchClient={searchClient}
      routing={useRouting()}
    >
      <SearchLayout />
    </InstantSearch>
  </SearchErrorBoundary>
)

const useSearchStatus = () => {
  const { results } = useInstantSearch()

  if (!results.query) {
    return "loading"
  } else if (results.nbHits === 0) {
    return "empty"
  } else {
    return "results"
  }
}

const SearchLayout = () => {
  const status = useSearchStatus()
  return (
    <SearchContainer>
      <Row>
        <SearchBox placeholder="Search For Bills" className="mt-2 mb-3" />
      </Row>
      <Row>
        {status === "empty" ? (
          <NoResults>
            Your search has yielded zero results!
            <br />
            <b>Try another search term</b>
          </NoResults>
        ) : (
          <GlobalSearchHits />
        )}
      </Row>
    </SearchContainer>
  )
}
