export const enum RoleType {
    EDITOR = 'editor',
}

export const enum BlockType {
    // Layout
    PAGE = 'page',
    COLUMN = 'column',
    COLUMN_LIST = 'column_list',
    // Basic
    TEXT = 'text',
    HEADER = 'header',
    SUB_HEADER = 'sub_header',
    SUB_SUB_HEADER = 'sub_sub_header',
    NUMBERED_LIST = 'numbered_list',
    BULLETED_LIST = 'bulleted_list',
    QUOTE = 'quote',
    TO_DO = 'to_do',
    DIVIDER = 'divider',
    CALLOUT = 'callout',
    TOGGLE = 'toggle',
    // Media
    AUDIO = 'audio',
    VIDEO = 'video',
    IMAGE = 'image',
    FILE = 'file',
    CODE = 'code',
    BOOKMARK = 'bookmark',
    // Collection
    COLLECTION_VIEW_PAGE = 'collection_view_page',
    COLLECTION_VIEW = 'collection_view',
    // Embed
    EMBED = 'embed',
    LOOM = 'loom',
    MAPS = 'maps',
    FIGMA = 'figma',
    GIST = 'gist',
    CODEPEN = 'codepen',
    DRIVE = 'drive',
    FRAMER = 'framer',
    PDF = 'pdf',
    INVISION = 'invision',
    TWEET = 'tweet',
    TYPEFORM = 'typeform',
    // Advance
    EQUATION = 'equation',
    TABLE_OF_CONTENTS = 'table_of_contents',
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

export interface TableOfContentsBlockValue extends BlockValue<BlockType.TABLE_OF_CONTENTS> {
    format?: {
        block_color: string
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

export interface CollectionViewBlockValue extends BlockValue<BlockType.COLLECTION_VIEW> {
    view_ids: string[]
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

export interface ColumnBlockValue extends BlockValue<BlockType.COLUMN> {
    content?: BlockId[],
    format?: {
        column_radio: number
    }
}

export interface VideoBlockValue extends BlockValue<BlockType.VIDEO> {
    file_ids?: string[],
    format?: {
        block_full_width: boolean
        block_page_width: boolean
        block_preserve_scale: boolean
        block_width: number
        display_source: string
    },
    properties: {
        source: string[][]
    }
}

export interface EquationBlockValue extends BlockValue<BlockType.EQUATION>, BaseTextBlockValue {
}

export interface ColumnListBlockValue extends BlockValue<BlockType.COLUMN_LIST> {
    content?: BlockId[]
}

export interface FileBlockValue extends BlockValue<BlockType.FILE> {
    file_ids?: string[],
    properties: {
        size?: string[][],
        source?: string[][],
        title?: string[][]
    }
}

export interface EmbedBlockValue extends BlockValue<BlockType.EMBED>, BaseEmbedBlockType {
}

export interface LoomBlockValue extends BlockValue<BlockType.LOOM>, BaseEmbedBlockType {
}

export interface MapsBlockValue extends BlockValue<BlockType.MAPS>, BaseEmbedBlockType {
}

export interface FigmaBlockValue extends BlockValue<BlockType.FIGMA>, BaseEmbedBlockType {
}

export interface GistBlockValue extends BlockValue<BlockType.GIST>, BaseEmbedBlockType {
}

export interface CodepenBlockValue extends BlockValue<BlockType.CODEPEN>, BaseEmbedBlockType {
}

export interface DriveBlockValue extends BlockValue<BlockType.DRIVE>, BaseEmbedBlockType {
}

export interface FramerBlockValue extends BlockValue<BlockType.FRAMER>, BaseEmbedBlockType {
}

export interface PdfBlockValue extends BlockValue<BlockType.PDF>, BaseEmbedBlockType {
}

export interface InvisionBlockValue extends BlockValue<BlockType.INVISION>, BaseEmbedBlockType {
}

export interface TweetBlockValue extends BlockValue<BlockType.TWEET>, BaseEmbedBlockType {
}

export interface TypeformBlockValue extends BlockValue<BlockType.TYPEFORM>, BaseEmbedBlockType {
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
