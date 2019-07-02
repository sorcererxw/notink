import fetch from 'node-fetch'
import {
  BlockId,
  CollectionQuery,
  Cursor,
  PageChunk,
  RecordMap,
  RecordValue,
  UserId,
} from './types'

const BASE_URL = 'https://www.notion.so/api/v3'

async function _post<T>(url: string, data?: any): Promise<T> {
  return fetch(`${BASE_URL}${url}`, {
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    method: 'POST',
  }).then(res => res.json())
}

export async function getSignedFileUrls(data: {
  url: string
  permissionRecord: {
    id: string
    table: string
  }
}) {
  return _post('/getSignedFileUrls', data)
}

export async function loadPageChunk(data: {
  chunkNumber: number
  limit: number
  pageId: string
  verticalColumns: boolean
  cursor: { stack: Cursor[] }
}): Promise<PageChunk> {
  return _post('/loadPageChunk', data)
}

export async function queryCollection(data: {
  collectionId: string
  collectionViewId: string
  loader: {
    limit: number
    loadContentCover: boolean
    type: string
    userLocale: string
    userTimeZone: string
  }
  query: CollectionQuery
}): Promise<{
  recordMap: RecordMap
  result: {
    type: string
    total: number
    blockIds: BlockId[]
    aggregationResults: {
      id: string
      value: number
    }[]
  }
}> {
  return _post('/queryCollection', data)
}

/**
 * get record value from specific db table
 * @param data
 */
export async function getRecordValues(data: {
  requests: {
    id: string
    table: string
  }[]
}): Promise<RecordValue[]> {
  return _post('/getRecordValues', data)
}

export async function getPublicData(data: {
  blockId: BlockId
  collectionViewId: string
  name: string
  saveParent: boolean
  showMoveTo: boolean
  spaceDomain: string
}): Promise<{
  betaEnabled: boolean
  canJoinSpace: boolean
  hasPublicAccess: boolean
  icon: string
  ownerUserId: UserId
  spaceDomain: string
  spaceId: string
  spaceName: string
  userHasExplicitAccess: true
}> {
  return _post('/getPublicPageData', data)
}
