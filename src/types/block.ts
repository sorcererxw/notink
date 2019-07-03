import { BlockId, BlockType, RoleType, UserId } from './common'
import { RichText, TextStyleType } from './text'

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
  properties?: { [key: string]: any }
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
