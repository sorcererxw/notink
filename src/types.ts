export const enum RoleType {
  EDITOR = 'editor',
  READER = 'reader',
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

export const enum CollectionViewType {
  LIST = 'list',
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

export interface PageChunk {
  cursor: { stack: Cursor[] }
  recordMap: {
    block?: { [blockId: string]: RoleEntry<BlockValue<BlockType>> }
    notion_user?: { [userId: string]: RoleEntry<NotionUserValue> }
    space?: { [spaceId: string]: RoleEntry<SpaceValue> }
    collection?: { [collectionId: string]: RoleEntry<CollectionValue> }
    collection_view?: { [collectionViewId: string]: RoleEntry<CollectionViewValue> }
  }
}

export interface RoleEntry<T> {
  role: RoleType
  value: T
}

export interface Cursor {
  id: BlockId
  table: string
  index: number
}

// Workspace information
export interface SpaceValue {
  beta_enabled: boolean
  created_by: string
  created_time: number
  domain: string
  icon: string
  id: string
  last_edited_by: string
  last_edited_time: number
  name: string
  pages: string[] // pageIds
  permission: {
    role: string
    type: string
    user_id: string
  }[]
  version: number
}

export interface BlockValue<T extends BlockType> {
  alive: boolean
  id: BlockId
  parent_id: BlockId
  parent_table: string
  created_by: UserId
  created_time: number
  last_edited_by: UserId
  last_edited_time: number
  type: T
  version: number
}

export interface BaseTextBlockValue {
  properties?: {
    title: [string, [TextStyleType, string?][]?][]
  }
}

export interface BasePermissionValue {
  permissions: {
    role: RoleType
    type: 'user_permission' | 'public_permission'
    user_id?: UserId // exist when type is user_permission
  }[]
}

export interface BaseEmbedBlockType {
  format?: {
    block_width: number
    block_height?: number
    block_full_width: boolean
    block_page_width: boolean
    block_aspect_ratio?: number
    block_preserve_scale: boolean
    display_source: string
  }
  properties?: {
    caption?: string[][]
    source?: string[][]
  }
}

export interface BaseContainerType {
  content?: BlockId[]
}

export interface TableOfContentsBlockValue extends BlockValue<BlockType.TABLE_OF_CONTENTS> {
  format?: {
    block_color: string
  }
}

export interface BulletedListBlockValue
  extends BlockValue<BlockType.BULLETED_LIST>,
    BaseTextBlockValue,
    BaseContainerType {}

export interface NumberedListBlockValue
  extends BlockValue<BlockType.NUMBERED_LIST>,
    BaseTextBlockValue,
    BaseContainerType {}

export interface ToDoBlockValue extends BlockValue<BlockType.TO_DO> {
  properties?: {
    title?: RichText
    checked?: ['Yes' | 'No'][]
  }
}

export interface DividerBlockValue extends BlockValue<BlockType.DIVIDER> {}

export interface CodeBlockValue extends BlockValue<BlockType.CODE> {
  properties?: {
    language: string[][] // for code block to specific programming language
    title?: RichText
  }
}

export interface ToggleBlockValue
  extends BlockValue<BlockType.TOGGLE>,
    BaseTextBlockValue,
    BaseContainerType {}

export interface CollectionViewBlockValue extends BlockValue<BlockType.COLLECTION_VIEW> {
  view_ids: string[]
}

export interface ImageBlockValue extends BlockValue<BlockType.IMAGE>, BaseEmbedBlockType {
  file_ids?: string[]
}

export interface TextBlockValue extends BlockValue<BlockType.TEXT>, BaseTextBlockValue {}

export interface QuoteBlockValue extends BlockValue<BlockType.QUOTE>, BaseTextBlockValue {}

export interface HeaderBlockValue extends BlockValue<BlockType.HEADER>, BaseTextBlockValue {}

export interface SubHeaderBlockValue extends BlockValue<BlockType.SUB_HEADER>, BaseTextBlockValue {}

export interface SubSubHeaderBlockValue
  extends BlockValue<BlockType.SUB_SUB_HEADER>,
    BaseTextBlockValue {}

export interface PageBlockValue extends BlockValue<BlockType.PAGE>, BasePermissionValue {
  content: string[]
  format: {
    page_icon?: string
    page_cover?: string
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
  extends BlockValue<BlockType.COLLECTION_VIEW_PAGE>,
    BasePermissionValue {
  view_ids: string[]
}

export interface ColumnBlockValue extends BlockValue<BlockType.COLUMN> {
  content?: BlockId[]
  format?: {
    column_radio: number
  }
}

export interface VideoBlockValue extends BlockValue<BlockType.VIDEO>, BaseEmbedBlockType {
  file_ids?: string[]
}

export interface EquationBlockValue extends BlockValue<BlockType.EQUATION>, BaseTextBlockValue {}

export interface ColumnListBlockValue
  extends BlockValue<BlockType.COLUMN_LIST>,
    BaseContainerType {}

export interface FileBlockValue extends BlockValue<BlockType.FILE> {
  file_ids?: string[]
  properties: {
    size?: string[][]
    source?: string[][]
    title?: string[][]
  }
}

export interface EmbedBlockValue extends BlockValue<BlockType.EMBED>, BaseEmbedBlockType {}

export interface AudioBlockValue extends BlockValue<BlockType.AUDIO>, BaseEmbedBlockType {}

export interface LoomBlockValue extends BlockValue<BlockType.LOOM>, BaseEmbedBlockType {}

export interface MapsBlockValue extends BlockValue<BlockType.MAPS>, BaseEmbedBlockType {}

export interface FigmaBlockValue extends BlockValue<BlockType.FIGMA>, BaseEmbedBlockType {}

export interface GistBlockValue extends BlockValue<BlockType.GIST>, BaseEmbedBlockType {}

export interface CodepenBlockValue extends BlockValue<BlockType.CODEPEN>, BaseEmbedBlockType {}

export interface DriveBlockValue extends BlockValue<BlockType.DRIVE>, BaseEmbedBlockType {}

export interface FramerBlockValue extends BlockValue<BlockType.FRAMER>, BaseEmbedBlockType {}

export interface PdfBlockValue extends BlockValue<BlockType.PDF>, BaseEmbedBlockType {}

export interface InvisionBlockValue extends BlockValue<BlockType.INVISION>, BaseEmbedBlockType {}

export interface TweetBlockValue extends BlockValue<BlockType.TWEET>, BaseEmbedBlockType {}

export interface TypeformBlockValue extends BlockValue<BlockType.TYPEFORM>, BaseEmbedBlockType {}

export const enum SchemeType {
  TITLE = 'title',
  CHECKBOX = 'checkbox',
  LAST_EDITED_TIME = 'last_edited_time',
  MULTI_SELECT = 'multi_select',
  DATE = 'date',
  CREATED_TIME = 'created_time',
  TEXT = 'text',
  PHONE_NUMBER = 'phone_number',
  FILE = 'file',
  FORMULA = 'formula',
}

export interface Scheme<T extends SchemeType> {
  name: string
  type: T
}

// TODO
export const enum FormulaType {
  OPERATOR = 'operator',
  CONSTANT = 'constant',
  SYMBOL = 'symbol',
}

export const enum FormulaResultType {
  NUMBER = 'number',
}

export const enum FormulaOperatorType {
  PLUS = '+',
}

export interface FormulaObject {
  type: FormulaType
  result_type: FormulaResultType
  operator?: FormulaOperatorType
  name?: string
  value?: string
  args?: FormulaObject[]
}

export interface FormulaScheme extends Scheme<SchemeType.FORMULA> {
  formula?: FormulaObject
}

export interface TitleScheme extends Scheme<SchemeType.TITLE> {}

export interface CheckboxScheme extends Scheme<SchemeType.CHECKBOX> {}

export interface LastEditedTimeScheme extends Scheme<SchemeType.LAST_EDITED_TIME> {}

export interface MultiSelectScheme extends Scheme<SchemeType.MULTI_SELECT> {
  options?: {
    // TODO: Color type
    color: string
    id: string
    value: string
  }[]
}

export interface DateScheme extends Scheme<SchemeType.DATE> {
  date_format: 'relative' | 'YYYY/MM/DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'MMM DD, YYYY'
}

export interface CretaedTimeScheme extends Scheme<SchemeType.CREATED_TIME> {}

export interface TextScheme extends Scheme<SchemeType.TEXT> {}

export interface CollectionValue {
  alive: boolean
  cover: string
  file_ids?: string[]
  format: {
    collection_cover_position: number
    collection_page_properties: {
      visible: boolean
      property: string
    }[]
  }
  icon: string
  id: string
  name: string[][]
  parent_id: string
  parent_table: string
  scheme: {
    [schemeId: string]: {
      date_format: string | undefined // only exits when type is date
      name: string
      type: SchemeType
    }
  }
}

export interface CollectionViewValue {
  alive: boolean
  format: {
    table_wrap: boolean
    table_properties: {
      width: number
      visible: boolean
      property: string
    }[]
  }
  id: string
  name: string
  version: number
  type: CollectionViewType
  parent_table: string
  parent_id: string
  page_sort: string[]
  query: CollectionQuery
}

export interface CollectionQuery {
  filter_operator: 'and' | 'or'
  filter?: {
    comparator: string
    id: string
    property: string
    type: SchemeType
  }[]
  sort?: {
    id: string
    type: string
    property: string
    direction: string
  }[]
  aggregate?: {
    id: string
    aggregation_type: 'count'
    property: string
    type: string
    view_type: string
  }[]
}

export type RecordValue = RoleEntry<any>

export interface UserSettingsValue {
  id: string
  version: number
  space_views: string[]
}

export interface UserRootValue {
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

export interface NotionUserValue {
  clipper_onboarding_completed: boolean
  mobile_onboarding_completed: boolean
  onboarding_completed: boolean
  email: string
  family_name: string
  given_name: string
  id: string
  profile_photo: string
  version: number
}
