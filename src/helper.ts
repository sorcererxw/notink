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
    const value: BlockValue<BlockType> = pageChunk.recordMap.block[blockId].value
    const content: string[] = (value as any).content
    const children = content ? _.compact(content.map(it => getBlockNode(it))) : undefined
    return {
      value,
      children,
    }
  }
  return getBlockNode(pageId)!
}

export {}
