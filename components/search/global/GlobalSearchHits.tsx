import {
  Hits,
  Index,
  Configure
} from "@alexjball/react-instantsearch-hooks-web"
import { GlobalBillHit } from "./GlobalBillHit"
import { Card, ListGroup } from "react-bootstrap"

export const GlobalSearchHits = () => {
  return (
    <Card>
      <ListGroup>
        <Index indexName="bills/sort/_text_match:desc,testimonyCount:desc">
          {/* <Configure hitsPerPage={10} /> */}
          <Hits hitComponent={GlobalBillHit} />
        </Index>
      </ListGroup>
    </Card>
  )
}
