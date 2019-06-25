import fetch from 'node-fetch'
import {
  BlockId,
  BlockType,
  BlockValue,
  CollectionQuery,
  CollectionValue,
  CollectionViewValue,
  Cursor,
  NotionUserValue,
  RoleEntry,
  SpaceValue,
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
}): Promise<{
  cursor: { stack: Cursor[] }
  recordMap: {
    block: { [blockId: string]: RoleEntry<BlockValue<BlockType>> }
    notion_user: { [userId: string]: RoleEntry<NotionUserValue> }
    space: { [spaceId: string]: RoleEntry<SpaceValue> }
  }
}> {
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
  recordMap: {
    block: { [blockId: string]: RoleEntry<BlockValue<BlockType>> }
    collection: { [collectionId: string]: RoleEntry<CollectionValue> }
    collection_view: { [viewId: string]: RoleEntry<CollectionViewValue> }
    space: { [spaceId: string]: RoleEntry<SpaceValue> }
  }
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

export async function getReordValues(data: {
  requests: {
    id: string
    table: string
  }[]
}): Promise<{
  result: {
    role: string
    value:
      | {
          clipper_onboarding_completed: boolean
          email: string
          family_name: string
          given_name: string
          id: string
          mobile_onboarding_completed: boolean
          onboarding_completed: boolean
          profile_photo: string
          version: number
        }
      | {
          id: string
          version: number
          space_views: string[]
        }
      | {
          id: string
          version: number
          settings: {
            created_evernote_getting_started: boolean
            locale: string
            persona: string
            signup_time: number
            start_day_of_week: number
            time_zone: string
            use_case: string
            used_android_app: boolean
            used_desktop_web_app: boolean
            used_mac_app: boolean
            used_mobile_web_app: boolean
            used_windows_app: boolean
            user_case: string
          }
        }
      | {
          alive: boolean
          type: string
          version: number
          parent_table: string
          parent_id: string
          last_edited_time: number
          last_edited_by: string
          id: string
          created_by: string
          created_time: number
          content: string[]
          permission: {
            role: string
            type: string
            user_id: string | undefined
          }[]
          properties: {
            title: string[][]
          }
        }
  }[]
}> {
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
