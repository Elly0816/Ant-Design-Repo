import { Button, Input, InputRef, Radio, Space } from "antd";
import { ColumnType } from "antd/es/table";
import {FilterFilled, SearchOutlined} from "@ant-design/icons"
import { FilterConfirmProps, FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from 'react-highlight-words';
import { Dropdown } from "./FilterDropdown";


/*
  This exports the interface DataType that is used by the currencies and favorites tables.
  It also exports the column search props for the name column,
  this helps with filtering string data.
*/

export interface DataType {
    key: string;
    name: {
      countryCode: string,
      currencySymbol: string,
      currencyCode: string,
      currencyName: string
  };
    rate: number;
    '24 hour change': number;
    '7 day change': number;
    '1 month change': number;
    '1 year change': number
  }

type DataIndex = keyof DataType





// Name column search filter
export const getColumnSearchProps = (
    dataIndex: DataIndex,
    searchInput: React.RefObject<InputRef>,
    handleSearch: (selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex) => void,
    rowSelection: {
      selectedRowKeys: React.Key[],
      onChange: (newSelectedRowKeys: React.Key[]) => void
    },
    handleReset: (clearFilters: () => void) => void,
    setSearchText: React.Dispatch<React.SetStateAction<string>>,
    setSearchedColumn: React.Dispatch<React.SetStateAction<string>>,
    searchedColumn: string,
    searchText: string ): ColumnType<DataType> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    // <Dropdown {...{setSelectedKeys, selectedKeys, confirm, clearFilters, close, title: 'name'}}/>
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => {
          handleSearch(selectedKeys as string[], confirm, dataIndex);
          rowSelection.onChange(selectedKeys);
        }}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setSearchText((selectedKeys as string[])[0]);
            setSearchedColumn(dataIndex);
            // handleSearch((selectedKeys as string[]), confirm, dataIndex)
          }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value, record): boolean => {
    if (typeof value === 'string'){
      const name = record[dataIndex] as {currencyName: string, currencyCode: string};
      return (name.currencyName.toLowerCase().includes(value.toLowerCase()) || 
        name.currencyCode.toLowerCase().includes(value.toLowerCase()));
    }
    return false;
  },
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: 'gold', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});









// Numeric columns filters
export const numericFilters = (dataIndex: DataIndex,
  // title: string,
  searchInput: React.RefObject<InputRef>,
  handleSearch: (selectedKeys: string[],
  confirm: (param?: FilterConfirmProps) => void,
  dataIndex: DataIndex) => void,
  rowSelection: {
    selectedRowKeys: React.Key[],
    onChange: (newSelectedRowKeys: React.Key[]) => void
  },
  handleReset: (clearFilters: () => void) => void,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  setSearchedColumn: React.Dispatch<React.SetStateAction<string>>,
  searchedColumn: string,
  searchText: string ):ColumnType<DataType> => ({


  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }:FilterDropdownProps) => 
  (<Dropdown  {...{title:dataIndex, selectedKeys, setSelectedKeys, confirm, clearFilters, close}}/>),
      filterIcon: (filtered: boolean) => (
        <FilterFilled style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (values, record): boolean => {
        console.log("This is the value from the filter");
        console.log(values);
        const {action, value, title}  = values as unknown as {action: string, value: number, title: string}
        //{action: '<', value: 0.2, title: 'Rate'}
        switch(action){
          case '<':
            return record[dataIndex] < value;
          case '>':
            return record[dataIndex] > value;
          case '=':
            return record[dataIndex] == value;
          case '<=':
            return record[dataIndex] <= value;
          case ">=":
            return record[dataIndex] >= value;
          default:
            return false;
        }
        // if (typeof value === 'string'){
        //   const newValue = parseFloat(value);
        //   console.log(newValue);
        //   const name = record[dataIndex] as {currencyName: string, currencyCode: string};
        //   // return (name.currencyName.toLowerCase().includes(value.toLowerCase()) || 
        //   //   name.currencyCode.toLowerCase().includes(value.toLowerCase()));
        // }
        // return false;
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: 'gold', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
        // filters: [
        //   {text: "Equal To", value: "="},
        //   {text: "Less Than", value: "<"},
        //   {text: "Less Than or Equal To", value: "<="},
        //   {text: "Greater Than", value: ">"},
        //   {text: "Greater Than or Equal To", value: ">="},
        //         ],
        // // filterSearch: (input, filter): boolean => {
        // //   console.log(input);
        // //   console.log(filter);
        // //   return true;
              
        // //   }
        // filterSearch: true

})
  