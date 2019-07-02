import { CollectionValue, CollectionViewValue } from './collection'
import { BlockValue } from './block'

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

export type UserId = string
export type BlockId = string

export interface PageChunk {
  cursor: { stack: Cursor[] }
  recordMap: RecordMap
}

export interface RecordMap {
  block?: { [blockId: string]: RoleEntry<BlockValue<BlockType>> }
  notion_user?: { [userId: string]: RoleEntry<NotionUserValue> }
  space?: { [spaceId: string]: RoleEntry<SpaceValue> }
  collection?: { [collectionId: string]: RoleEntry<CollectionValue> }
  collection_view?: { [collectionViewId: string]: RoleEntry<CollectionViewValue> }
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

export type RecordValue = RoleEntry<any>
