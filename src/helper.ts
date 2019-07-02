import { BlockType, BlockValue, Cursor, PageChunk } from './types'
import { loadPageChunk } from './client'
import * as _ from 'lodash'

export interface BlockNode {
  value: BlockValue<BlockType>
  children?: BlockNode[]
}

function mergeRecordMap<T>(
  maps: ({ [id: string]: T } | undefined)[],
): { [id: string]: T } | undefined {
  const result: { [id: string]: T } = {}
  for (const map of maps) {
    if (map === undefined) {
      continue
    }
    for (const key of Object.keys(map)) {
      if (result.hasOwnProperty(key)) {
        continue
      }
      result[key] = map[key]
    }
  }
  if (Object.keys(result).length > 0) {
    return result
  }
}

/**
 * example: https://www.notion.so/notinktest/Get-Started-1d748958865c4cf397d6c996756cd77e
 * @param blockId: 1d748958865c4cf397d6c996756cd77e
 * @return real block id: 1d748958-865c-4cf3-97d6-c996756cd77e
 */
export function getFullBlockId(blockId: string): string {
  if (blockId.match('^[a-zA-Z0-9]+$')) {
    return [
      blockId.substr(0, 8),
      blockId.substr(8, 4),
      blockId.substr(12, 4),
      blockId.substr(16, 4),
      blockId.substr(20, 32),
    ].join('-')
  }
  return blockId
}

export async function loadFullPageChunk(pageId: string): Promise<PageChunk> {
  let cursor: { stack: Cursor[] } = { stack: [] }
  let chunkNumber = 0
  const limit = 50
  const chunks: PageChunk[] = []
  do {
    const pageChunk = await loadPageChunk({
      chunkNumber,
      limit,
      pageId,
      verticalColumns: true,
      cursor,
    })
    cursor = pageChunk.cursor
    chunkNumber++
    chunks.push(pageChunk)
  } while (cursor && cursor.stack.length > 0)
  return {
    cursor: { stack: [] },
    recordMap: {
      block: mergeRecordMap(chunks.map(it => it.recordMap.block)),
      collection: mergeRecordMap(chunks.map(it => it.recordMap.collection)),
      collection_view: mergeRecordMap(chunks.map(it => it.recordMap.collection_view)),
      notion_user: mergeRecordMap(chunks.map(it => it.recordMap.notion_user)),
      space: mergeRecordMap(chunks.map(it => it.recordMap.space)),
    },
  }
}

export async function loadBlockTree(pageId: string): Promise<BlockNode> {
  const pageChunk = await loadFullPageChunk(pageId)
  const getBlockNode = (blockId: string): BlockNode | undefined => {
    if (!pageChunk.recordMap.block) {
      return
    }
    const value = pageChunk.recordMap.block[blockId].value
    const content: string[] = (value as any).content
    const children = content ? _.compact(content.map(it => getBlockNode(it))) : undefined
    return {
      value,
      children,
    }
  }
  return getBlockNode(pageId)!
}

// export async function loadCollectionItems<T>(data: {
//   collectionId: string
//   collectionViewId: string
//   loader: {
//     limit: number
//     loadContentCover: boolean
//     type: string
//     userLocale: string
//     userTimeZone: string
//   }
//   query: CollectionQuery
// }): Promise<T[]> {
//
// }

export {}
