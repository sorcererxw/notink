import { SchemeType } from './scheme'
import { CollectionViewType } from './common'

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
