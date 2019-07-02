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
