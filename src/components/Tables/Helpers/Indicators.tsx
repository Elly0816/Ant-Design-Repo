import { Tag } from 'antd'
import { ReactNode } from 'react'
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'
import { tableSorters, tableFilters, onTableFilter } from './Table.Utilities'

export default function Indicator({
    sorters,
    filters,
}: {
    sorters: tableSorters
    filters: tableFilters
}): ReactNode {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {sorters !== undefined && sorters.order !== undefined && (
                <Tag color={sorters.order === 'descend' ? 'red' : 'green'}>
                    {sorters.field.toUpperCase()}{' '}
                    {sorters.order === 'descend' ? (
                        <CaretDownFilled />
                    ) : (
                        <CaretUpFilled />
                    )}
                </Tag>
            )}
            {filters && (
                <span>
                    {Object.entries(filters).map(
                        ([key, value]: [
                            key: string,
                            value: string | null | onTableFilter[]
                        ]): ReactNode | null => {
                            return (
                                value !== null &&
                                typeof value !== 'string' && (
                                    <Tag color="blue">
                                        {key.toUpperCase()}: {value[0].action}{' '}
                                        {value[0].value}
                                    </Tag>
                                )
                            )
                        }
                    )}
                </span>
            )}
        </div>
    )
}
