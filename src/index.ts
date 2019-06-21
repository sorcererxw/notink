import fetch from 'node-fetch'

const BASE_URL = 'http://localhost:3000'

async function _post<T>(url: string, data?: any): Promise<T> {
    return fetch(`${BASE_URL}${url}`,
        {
            body: data ? JSON.stringify(data) : undefined,
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            method: 'POST',
        },
    ).then(res => res.json())
}

// tslint:disable-next-line:no-unused
async function _get<T>(url: string): Promise<T> {
    return fetch(`${BASE_URL}${url}`,
        {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            method: 'GET',
        },
    ).then(async res => {
        console.log(res)
        return res.json()
    })
}

export const enum RoleType {
    EDITOR = 'editor',
}

export const enum BlockType {
    TEXT = 'text',
    PAGE = 'page',
    COLUMN_LIST = 'column_list',
    HEADER = 'header',
    SUB_HEADER = 'sub_header',
    NUMBERED_LIST = 'numbered_list',
}

export type UserId = string
export type BlockId = string

export interface RoleEntry<T> {
    role: RoleType,
    value: T
}

export interface SpaceValue {
    beta_enabled: boolean,
    created_by: string,
    created_time: number,
    domain: string,
    icon: string,
    id: string,
    last_edited_by: string,
    last_edited_time: number,
    name: string,
    pages: string[], // pageIds
    permission: {
        role: string,
        type: string,
        user_id: string
    }[],
    version: number
}

export interface BlockValue {
    alive: boolean,
    id: BlockId,
    parent_id: BlockId,
    parent_table: string,
    created_by: UserId,
    created_time: number,
    last_edited_by: UserId,
    last_edited_time: number,
    type: BlockType,
    ignore_block_count: boolean,
    content?: string[],
    format?: { // only for page
        page_cover: string,
        page_cover_position: number // [0-1] proportion
    },
    properties: {
        // TODO text style type
        title?: [string, string[][]?][]
        [name: string]: any
    }
    version: number
}

export interface CollectionValue {
    alive: boolean,
    cover: string,
    file_ids: string[],
    format: {
        collection_cover_position: number,
        collection_page_properties: {
            visible: boolean,
            property: string
        }[]
    },
    icon: string,
    id: string,
    name: string[][],
    parent_id: string,
    parent_table: string,
    scheme: {
        [schemeId: string]: {
            date_format: string | undefined // only exits when type is date
            name: string,
            type: string
        }
    }
}

export interface CollectionViewValue {
    alive: boolean,
    format: {},
    id: string,
    name: string,
    version: number,
    type: string,
    parent_table: string,
    parent_id: string,
    page_sort: string[],
    query: CollectionQuery
}

export interface CollectionQuery {
    filter_operator: string,
    filter: {
        comparator: string,
        id: string,
        property: string,
        type: string
    }[],
    sort: {
        id: string,
        type: string,
        property: string,
        direction: string
    }[],
    aggregate: {
        id: string,
        aggregation_type: string,
        property: string,
        type: string,
        view_type: string
    }[]
}

export interface NotionUserValue {
    clipper_onboarding_completed: boolean,
    mobile_onboarding_completed: boolean,
    onboarding_completed: boolean,
    email: string,
    family_name: string,
    given_name: string,
    id: string,
    profile_photo: string,
    version: number
}

export async function getSignedFileUrls(data: {
    url: string,
    permissionRecord: {
        id: string,
        table: string
    }
}) {
    return _post('/getSignedFileUrls', data)
}

export async function loadPageChunk(data: {
    chunkNumber: number,
    limit: number,
    pageId: string,
    verticalColumns: boolean,
    // TODO: update cursor
    cursor: { stack: [] }
}): Promise<{
    cursor: { stack: [] }
    recordMap: {
        block: { [blockId: string]: RoleEntry<BlockValue> },
        notion_user: { [userId: string]: RoleEntry<NotionUserValue> },
        space: { [spaceId: string]: RoleEntry<SpaceValue> }
    }
}> {
    return _post('/loadPageChunk', data)
}

export async function queryCollection(data: {
    collectionId: string,
    collectionViewId: string,
    loader: {
        limit: number,
        loadContentCover: boolean,
        type: string,
        userLocale: string,
        userTimeZone: string
    },
    query: CollectionQuery
}): Promise<{
    recordMap: {
        block: { [blockId: string]: RoleEntry<BlockValue> }
        collection: { [collectionId: string]: RoleEntry<CollectionValue> }
        collection_view: { [viewId: string]: RoleEntry<CollectionViewValue> }
        space: { [spaceId: string]: RoleEntry<SpaceValue> }
    },
    result: {
        type: string,
        total: number,
        blockIds: string[],
        aggregationResults: {
            id: string,
            value: number
        }[]
    }
}> {
    return _post('/queryCollection', data)
}

export async function getReordValues(data: {
    requests: {
        id: string,
        table: string
    }[]
}): Promise<{
    result: {
        role: string,
        value: {
            clipper_onboarding_completed: boolean
            email: string
            family_name: string
            given_name: string
            id: string
            mobile_onboarding_completed: boolean
            onboarding_completed: boolean
            profile_photo: string
            version: number
        } | {
            id: string,
            version: number,
            space_views: string[]
        } | {
            id: string,
            version: number,
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
        } | {
            alive: boolean,
            type: string,
            version: number,
            parent_table: string,
            parent_id: string,
            last_edited_time: number,
            last_edited_by: string,
            id: string,
            created_by: string,
            created_time: number,
            content: string[],
            permission: {
                role: string,
                type: string,
                user_id: string | undefined
            }[],
            properties: {
                title: string[][]
            }
        }
    }[]
}> {
    return _post('/getRecordValues', data)
}

export async function getPublicData(data: {
    blockId: BlockId,
    collectionViewId: string,
    name: string,
    saveParent: boolean,
    showMoveTo: boolean,
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
