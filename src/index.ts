import fetch from 'node-fetch'

const BASE_URL = 'https://www.notion.so/api/v3'

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
    COLUMN = 'column',
    COLUMN_LIST = 'column_list',
    HEADER = 'header',
    SUB_HEADER = 'sub_header',
    SUB_SUB_HEADER = 'sub_sub_header',
    NUMBERED_LIST = 'numbered_list',
    BULLETED_LIST = 'bulleted_list',
    LIST = 'list',
    CODE = 'code',
    COLLECTION_VIEW_PAGE = 'collection_view_page',
    VIDEE = 'video',
    IMAGE = 'image',
    LOOM = 'loom',
    QUOTE = 'quote',
    MAPS = 'maps',
    FIGMA = 'figma',
    TO_DO = 'to_do',
    DIVIDER = 'divider',
    BOOKMARK = 'bookmark',
    CALLOUT = 'callout',
    TOGGLE = 'toggle',
}

export const enum TextStyleType {
    BOLD = 'b',
    ITALIC = 'i',
    CODE = 'c',
    LINK = 'a',
    HIGH_LIGHT = 'h',
    DELETED = 's',
}

export type UserId = string
export type BlockId = string

type RichText = [string, [TextStyleType, string?][]?][]

export interface RoleEntry<T> {
    role: RoleType,
    value: T
}

export interface Cursor {
    id: BlockId,
    table: string,
    index: number
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

export interface BlockValue<T extends BlockType> {
    alive: boolean,
    id: BlockId,
    parent_id: BlockId,
    parent_table: string,
    created_by: UserId,
    created_time: number,
    last_edited_by: UserId,
    last_edited_time: number,
    type: T,
    version: number,

    // ignore_block_count?: boolean,
    // format?: { // only for page
    //     table_wrap?: boolean
    //     list_properties?: {
    //         visible: boolean,
    //         property: string
    //     }[],
    //     table_properties?: {
    //         width: number,
    //         visible: boolean,
    //         property: string
    //     }[]
    // },
    // properties?: {
    //     // TODO text style type
    //     title?: [string, [TextStyleType, string?][]?][]
    //     list_properties?: {
    //         visible: boolean,
    //         property: string
    //     }[],
    //     [name: string]: any
    // }
    // query?: CollectionQuery
}

interface BaseTextBlockValue {
    properties?: {
        title: [string, [TextStyleType, string?][]?][]
    }
}

interface BasePermissionValue {
    permissions: {
        role: RoleType,
        type: 'user_permission' | 'public_permission',
        user_id?: UserId // exist when type is user_permission
    }[]
}

interface BaseEmbedBlockType {
    format?: {
        block_full_width: boolean
        block_height: number
        block_page_width: boolean
        block_preserve_scale: boolean
        block_width: number
        display_source: string
    }
    properties?: {
        caption?: string[][],
        source?: string[][]
    }
}

export interface BulletedListBlockValue
    extends BlockValue<BlockType.BULLETED_LIST>, BaseTextBlockValue {
    content?: BlockId[]
}

export interface NumberedListBlockValue
    extends BlockValue<BlockType.NUMBERED_LIST>, BaseTextBlockValue {
    content?: BlockId[]
}

export interface ToDoBlockValue extends BlockValue<BlockType.TO_DO> {
    properties?: {
        title?: RichText
        checked?: ['Yes' | 'No'][]
    }
}

export interface DividerBlockValue extends BlockValue<BlockType.DIVIDER> {
}

export interface CodeBlockValue extends BlockValue<BlockType.CODE> {
    properties?: {
        language: string[][] // for code block to specific programming language
        title?: RichText
    }
}

export interface ToggleBlockValue extends BlockValue<BlockType.TOGGLE>, BaseTextBlockValue {
    content?: BlockId[]
}

export interface ImageBlockValue extends BlockValue<BlockType.IMAGE> {
    format?: {
        block_aspect_ratio: number // 0.7289156626506024
        block_full_width: boolean
        block_height: number // 363
        block_page_width: boolean
        block_preserve_scale: boolean
        block_width: number // 498
        display_source: string /* "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/
        b10b10c5-6817-41fb-a66a-6f39289b29c4/Untitled.png" */
    }
    properties: {
        source: string[][]
    }
    file_ids?: string[]
}

export interface TextBlockValue extends BlockValue<BlockType.TEXT>, BaseTextBlockValue {
}

export interface QuoteBlockValue extends BlockValue<BlockType.QUOTE>, BaseTextBlockValue {
}

export interface HeaderBlockValue extends BlockValue<BlockType.HEADER>, BaseTextBlockValue {
}

export interface SubHeaderBlockValue extends BlockValue<BlockType.SUB_HEADER>, BaseTextBlockValue {
}

export interface SubSubHeaderBlockValue
    extends BlockValue<BlockType.SUB_SUB_HEADER>, BaseTextBlockValue {
}

export interface PageBlockValue extends BlockValue<BlockType.PAGE>, BasePermissionValue {
    content: string[],
    format: {
        page_icon?: string
        page_cover?: string,
        page_cover_position?: number // [0-1] proportion
    }
}

export interface BookmarkBlockValue extends BlockValue<BlockType.BOOKMARK> {
    format?: {
        bookmark_cover: string
        bookmark_icon: string
    }
    properties?: {
        description?: string[][]
        link?: string[][]
        title?: string[][]
    }
}

export interface CalloutBlockValue extends BlockValue<BlockType.CALLOUT>, BaseTextBlockValue {
    format?: {
        block_color: string // "gray_background"
        page_icon: string // emoji or link
    }
}

export interface CollectionViewPageBlockValue
    extends BlockValue<BlockType.COLLECTION_VIEW_PAGE>, BasePermissionValue {
    view_ids: string[]
}

export interface LoomBlockValue extends BlockValue<BlockType.LOOM>, BaseEmbedBlockType {
}

export interface MapsBlockValue extends BlockValue<BlockType.MAPS>, BaseEmbedBlockType {
}

export interface FigmaBlockValue extends BlockValue<BlockType.FIGMA>, BaseEmbedBlockType {
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
    filter?: {
        comparator: string,
        id: string,
        property: string,
        type: string
    }[],
    sort?: {
        id: string,
        type: string,
        property: string,
        direction: string
    }[],
    aggregate?: {
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
    cursor: { stack: Cursor[] }
}): Promise<{
    cursor: { stack: Cursor[] }
    recordMap: {
        block: { [blockId: string]: RoleEntry<BlockValue<BlockType>> },
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
        block: { [blockId: string]: RoleEntry<BlockValue<BlockType>> }
        collection: { [collectionId: string]: RoleEntry<CollectionValue> }
        collection_view: { [viewId: string]: RoleEntry<CollectionViewValue> }
        space: { [spaceId: string]: RoleEntry<SpaceValue> }
    },
    result: {
        type: string,
        total: number,
        blockIds: BlockId[],
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
