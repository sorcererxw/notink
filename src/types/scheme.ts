import { FormulaObject } from './formula'
import { ColorType } from './color'

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

export interface FormulaScheme extends Scheme<SchemeType.FORMULA> {
  formula?: FormulaObject
}

export interface TitleScheme extends Scheme<SchemeType.TITLE> {}

export interface CheckboxScheme extends Scheme<SchemeType.CHECKBOX> {}

export interface LastEditedTimeScheme extends Scheme<SchemeType.LAST_EDITED_TIME> {}

export interface MultiSelectScheme extends Scheme<SchemeType.MULTI_SELECT> {
  options?: {
    color: ColorType
    id: string
    value: string
  }[]
}

export interface DateScheme extends Scheme<SchemeType.DATE> {
  date_format: 'relative' | 'YYYY/MM/DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'MMM DD, YYYY'
}

export interface CretaedTimeScheme extends Scheme<SchemeType.CREATED_TIME> {}

export interface TextScheme extends Scheme<SchemeType.TEXT> {}
