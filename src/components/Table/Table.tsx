import { useRef, useState, ReactElement, useContext, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, InputRef, Tag } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import myButton from '../Button/Button';
import "./Table.css";
import Mybutton from '../Button/Button';
import { appContext } from '../../App';
import { tableData } from '../../helpers/getTableData';

interface DataType {
  key: string;
  flag: ReactElement
  name: string;
  rate: number;
  '7 day change': number;
  '1 month change': number;
  '1 year change': number
}

type DataIndex = keyof DataType;


export default function myTable (): ReactElement {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const {data, defValue} : {data: DataType[], defValue: {
    label: string;
    value: string | undefined;
}}= useContext(appContext);

  const [tableData, setTableData] = useState<DataType[]>(data);


  // const [data, setData] = useState<DataType[]>();

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
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
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
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


  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'key',
      width: '30%',
      ...getColumnSearchProps('name'),
      render: ((name: {countryCode: string, currencyName: string, currencySymbol: string, currencyCode: string}) => 
      <div title={name.currencyCode}>
        <span>{name.currencySymbol}</span>
        <br />
        <img alt={name.currencyName} src={`https://flagsapi.com/${name.countryCode}/shiny/16.png`}/>
        <br />
        <span>{name.currencyName}</span>
      </div>)
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: '20%',
      sorter: (a, b) => a.rate - b.rate,
      sortDirections: ['descend', 'ascend'],
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>1) ? 'green' : (rate<1) ? 'red' : 'gray'} key={rate}>
              {rate}
              </Tag>
        </span>
      ))
    },
    {
      title: '7 Day Change',
      dataIndex: '7 day change',
      key: '7 day change',
      width: '20%',
      sorter: (a, b) => a['7 day change'] - b['7 day change'],
      sortDirections: ['descend', 'ascend'],
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>0) ? 'green' : (rate<0) ? 'red' : 'gray'} key={rate}>
              {rate}
              </Tag>
        </span>
      ))
    },
    {
      title: '1 Month Change',
      dataIndex: '1 month change',
      key: '1 month change',
      width: '20%',
      sorter: (a, b) => a['1 month change'] - b['1 month change'],
      sortDirections: ['descend', 'ascend'],
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>0) ? 'green' : (rate<0) ? 'red' : 'gray'} key={rate}>
              {rate}
              </Tag>
        </span>
      ))
    },
    {
      title: '1 Year Change',
      dataIndex: '1 year change',
      key: '1 year change',
      width: '20%',
      sorter: (a, b) => a['1 year change'] - b['1 year change'],
      sortDirections: ['descend', 'ascend'],
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>0) ? 'green' : (rate<0) ? 'red' : 'gray'} key={rate}>
              {rate}
              </Tag>
        </span>
      ))
    },
  ]

  return <div className='table'>
        <div style={{ marginBottom: 16 }}>
            <div className="buttons-above-table">
                <Mybutton/>
                <Button title="Refresh" type="default" onClick={start} disabled={false} loading={loading}>
                    {!loading && <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>}
                </Button>
            </div>
            <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
        </div>
        <Table sticky={true} pagination={{position: ["topRight"]}} columns={columns} dataSource={data} />
    </div>;
};

