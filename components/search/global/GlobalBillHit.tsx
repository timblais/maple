import { Highlight } from "@alexjball/react-instantsearch-hooks-web"
import { maple } from "components/links"
import { Hit } from "instantsearch.js"
import Link from "next/link"
import { Card, Col, Image } from "../../bootstrap"
import { formatBillId } from "../../formatting"
import { ListGroup } from "react-bootstrap" // Need to move this into bootstrap components file?

type BillRecord = {
  number: string
  title: string
  city?: string
  court: number
  currentCommittee?: string
  testimonyCount: number
  endorseCount: number
  opposeCount: number
  neutralCount: number
  nextHearingAt?: number
  latestTestimonyAt?: number
  cosponsors: string[]
  cosponsorCount: number
  primarySponsor?: string
}

export const GlobalBillHit = ({ hit }: { hit: Hit<BillRecord> }) => {
  const url = maple.bill({ id: hit.number, court: hit.court })
  return (
    <Link href={url}>
      <a style={{ all: "unset" }} className="w-100">
        <ListGroup.Item>
          <Image src="/BillSearchResult.svg" alt="Bill Icon" />
          <div>
            <h6>
              {formatBillId(hit.number)} -{" "}
              <Highlight attribute="title" hit={hit} />
            </h6>
            <span>Bill</span>
          </div>
        </ListGroup.Item>
      </a>
    </Link>
  )
}
