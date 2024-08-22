import { WorkbookQuery } from "./workbook.types";

export type TableArgs = { data_source: string; table_name: string }
export type Table = { type: 'table' } & TableArgs
export type Column = {
	type: 'column'
	column_name: string
}
export type Measure = ColumnMeasure | ExpressionMeasure
export type ColumnMeasure = {
	measure_name: string
	column_name: string
	data_type: MeasureDataType
	aggregation: AggregationType
}
export type ExpressionMeasure = {
	measure_name: string
	expression: Expression
	data_type: MeasureDataType
}
export type Dimension = {
	column_name: string
	data_type: DimensionDataType
	granularity?: GranularityType
}

export type ColumnDataType =
	| 'String'
	| 'Integer'
	| 'Decimal'
	| 'Date'
	| 'Datetime'
	| 'Time'
	| 'Text'
export type MeasureDataType = 'String' | 'Integer' | 'Decimal'
export type DimensionDataType = 'String' | 'Date' | 'Datetime' | 'Time'
export type AggregationType = 'sum' | 'count' | 'avg' | 'min' | 'max'
export type GranularityType = 'day' | 'week' | 'month' | 'quarter' | 'year'
export type DataFormat = 'currency' | 'percent'

export type FilterOperator =
	| '='
	| '!='
	| '>'
	| '>='
	| '<'
	| '<='
	| 'in'
	| 'not_in'
	| 'between'
	| 'within'
	| 'contains'
	| 'not_contains'
	| 'starts_with'
	| 'ends_with'
	| 'is_set'
	| 'is_not_set'
export type FilterValue = string | number | boolean | any[] | string[] | undefined
export type Expression = {
	type: 'expression'
	expression: string
}

export type TableSource = { table: Table }
export type QuerySource = { query: WorkbookQuery }
export type SourceArgs = TableSource | QuerySource
export type Source = { type: 'source' } & SourceArgs

export type LogicalOperator = 'And' | 'Or'
export type FilterRule = {
	column: Column
	operator: FilterOperator
	value: FilterValue | Column
}
export type FilterExpression = { expression: Expression }
export type FilterArgs = FilterRule | FilterExpression
export type Filter = { type: 'filter' } & FilterArgs

export type FilterGroupArgs = { logical_operator: LogicalOperator; filters: FilterArgs[] }
export type FilterGroup = { type: 'filter_group' } & FilterGroupArgs

export type SelectArgs = { column_names: string[] }
export type Select = { type: 'select' } & SelectArgs

export type RenameArgs = { column: Column; new_name: string }
export type Rename = { type: 'rename' } & RenameArgs

export type RemoveArgs = { column_names: string[] }
export type Remove = { type: 'remove' } & RemoveArgs

export type CastArgs = { column: Column; data_type: ColumnDataType }
export type Cast = { type: 'cast' } & CastArgs

export type JoinType = 'inner' | 'left' | 'right' | 'full'
export type JoinCondition = { left_column: Column; right_column: Column } | { join_expression: Expression }
export type JoinArgs = {
	join_type: JoinType
	table: Table
	select_columns: Column[]
	join_condition: JoinCondition
}
export type Join = { type: 'join' } & JoinArgs

export type MutateArgs = { new_name: string; data_type: ColumnDataType; expression: Expression }
export type Mutate = { type: 'mutate' } & MutateArgs

export type SummarizeArgs = { measures: Measure[]; dimensions: Dimension[] }
export type Summarize = { type: 'summarize' } & SummarizeArgs

export type OrderByArgs = { column: Column; direction: 'asc' | 'desc' }
export type OrderBy = { type: 'order_by' } & OrderByArgs

export type Limit = { type: 'limit'; limit: number }

export type WindowOperationType = 'sum' | 'lag_difference' | 'row_number'
export type WindowOperationArgs = {
	op: WindowOperationType
	column: Column
	partition_by?: Column
	order_by?: Column
}
export type WindowOperation = { type: 'window_operation' } & WindowOperationArgs

export type PivotWiderArgs = {
	rows: Dimension[]
	columns: Dimension[]
	values: Measure[]
}
export type PivotWider = { type: 'pivot_wider' } & PivotWiderArgs

export type Operation =
	| Source
	| Filter
	| FilterGroup
	| Select
	| Rename
	| Remove
	| Cast
	| Join
	| Mutate
	| Summarize
	| OrderBy
	| Limit
	| PivotWider

export type QueryResultRow = Record<string, any>
export type QueryResultColumn = {
	name: string
	type: ColumnDataType
}

export type DropdownOption = {
	label: string
	value: string
	description: string
}

export type ColumnOption = DropdownOption & {
	query: string
	data_type: ColumnDataType
}

export type QueryResult = {
	executedSQL: string
	totalRowCount: number
	rows: QueryResultRow[]
	formattedRows: QueryResultRow[]
	columns: QueryResultColumn[]
	columnOptions: ColumnOption[]
}
