import { BackgroundType, ColorType } from './color'

export const enum TextStyleType {
  BOLD = 'b',
  ITALIC = 'i',
  CODE = 'c',
  LINK = 'a',
  HIGH_LIGHT = 'h',
  DELETED = 's',
  AT = '‣',
}

export const enum AtType {
  USER = 'u',
  PAGE = 'p',
}

type SimpleStyleType = [
  TextStyleType.BOLD | TextStyleType.ITALIC | TextStyleType.DELETED | TextStyleType.CODE,
]

type HighlightStyleType = [TextStyleType.HIGH_LIGHT, ColorType | BackgroundType]
type LinkStyleType = [TextStyleType.LINK, string]
type AtStyleText = [TextStyleType.AT, [AtType, string][]]

export type RichText = [
  string,
  (SimpleStyleType | HighlightStyleType | LinkStyleType | AtStyleText)[]?,
][]
