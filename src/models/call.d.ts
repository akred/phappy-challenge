/**
 * We can use Type instead of Interface
 * From what I read in documentation, The only extra feature Interfaces bring to the table (that Type aliases don’t),
 * is “declaration merging” which means you can define the same interface several times and with each definition, the properties get merged
 */
interface ICall {
    id: ID! // "unique ID of call"
    direction: String! // "inbound" or "outbound" call
    from: String! // Caller's number
    to: String! // Callee's number
    duration: Float! // Duration of a call (in seconds)
    is_archived: Boolean! // Boolean that indicates if the call is archived or not
    call_type: String! // The type of the call, it can be a missed, answered or voicemail.
    via: String! // Aircall number used for the call.
    created_at: String! // When the call has been made.
    notes: Note[]! // Notes related to a given call
}

interface CallProps {
    call: ICall
}

type ApiDataType = {
    hasNextPage: boolean,
    nodes: ICall[]
    totalCount: number
}