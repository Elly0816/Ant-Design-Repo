import { Tag } from "antd";
import { ReactElement, ReactNode } from "react";
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import {tableSorters, tableFilters, onTableFilter} from "./Table.Utilities";

export default function Indicator({sorters, filters}: {sorters: tableSorters, filters: tableFilters}): ReactElement {

    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    {sorters !== undefined && sorters.order !== undefined && <span>
      <Tag color={sorters.order === 'descend' ? 'red' : 'green'}>
        {sorters.field.toUpperCase()} {sorters.order === 'descend' ? <CaretDownFilled/> : <CaretUpFilled/>}
      </Tag>
    </span>}
    {filters && <span>
        {Object.entries(filters).map(([key, value]: [key: string, value: string | null | onTableFilter[]]): ReactNode | null => {
            
            
            return (value !== null && typeof value !== 'string') &&
                  <Tag color='blue'>
                    {key.toUpperCase()}: {value[0].action} {value[0].value}
                  </Tag>
        })}
      </span>}
  </div>
}