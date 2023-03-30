import { useRef, useState, ReactElement, useContext, useEffect, CSSProperties, Fragment } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, InputRef, Tag } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
// import myButton from '../Button/Button';
import "./Table.css";
import Mybutton from '../Button/Button';
import { appContext } from '../../App';
// import { tableData } from '../../helpers/getTableData';
import Loading from '../Loading/Loading';
import { DataType, getColumnSearchProps, numericFilters } from './Helpers/Table.Utilities';



type DataIndex = keyof DataType;


export default function myTable (): ReactElement {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loading, setLoading] = useState(false);
  

  const {loading, setLoading, editFavorites, favData, getData, defValue} : {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    editFavorites: (code: string) => void,
    favData: DataType[],
    getData: (data: string) => void,
    defValue:  {label: string, value: string|undefined}
}= useContext(appContext);


  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    getData(defValue.value as string);
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

  const nameStyle: CSSProperties = {
    display: 'flex',
    // justifyContent: 'space-evenly'
  }

  const imageStyle: CSSProperties = {
    marginRight: '5%'
  }



  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'key',
      width: '15%',
      fixed: 'right',
      ...getColumnSearchProps('name', searchInput, handleSearch,
      rowSelection, handleReset,
       setSearchText, setSearchedColumn, searchedColumn, searchText),
      render: ((name: {countryCode: string, currencyName: string, currencySymbol: string, currencyCode: string}) => 
      <div style={nameStyle} title={`${name.currencyName}`}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <br />
          <div>
            <img style={imageStyle} alt={name.currencyCode} src={`https://flagsapi.com/${name.countryCode}/shiny/16.png`}/>
          </div>
          <br />
          <span>{name.currencyCode}</span>
          <br/>
          <span>{` (${name.currencyName})`}</span>
        </div>
      </div>)
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: '10%',
      sorter: (a, b) => a.rate - b.rate,
      sortDirections: ['descend', 'ascend'],
      ...numericFilters('rate', searchInput, handleSearch,
      rowSelection, handleReset,
       setSearchText, setSearchedColumn, searchedColumn, searchText),
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>1) ? 'green' : (rate<1) ? 'red' : 'gray'} key={rate}>
              {rate}
              </Tag>
        </span>
      ))
    },
    {
      title: '24 hour change',
      dataIndex: '24 hour change',
      key: '24 hour change',
      width: '10%',
      sorter: (a, b) => a['24 hour change'] - b['24 hour change'],
      sortDirections: ['descend', 'ascend'],
      ...numericFilters('24 hour change', searchInput, handleSearch,
      rowSelection, handleReset,
       setSearchText, setSearchedColumn, searchedColumn, searchText),
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>0) ? 'green' : (rate<0) ? 'red' : 'gray'} key={rate}>
              {rate}%
              </Tag>
        </span>
      ))
    },
    {
      title: '7 Day Change',
      dataIndex: '7 day change',
      key: '7 day change',
      width: '10%',
      sorter: (a, b) => a['7 day change'] - b['7 day change'],
      sortDirections: ['descend', 'ascend'],
      ...numericFilters('7 day change', searchInput, handleSearch,
      rowSelection, handleReset,
       setSearchText, setSearchedColumn, searchedColumn, searchText),
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>0) ? 'green' : (rate<0) ? 'red' : 'gray'} key={rate}>
              {rate}%
              </Tag>
        </span>
      ))
    },
    {
      title: '1 Month Change',
      dataIndex: '1 month change',
      key: '1 month change',
      width: '10%',
      sorter: (a, b) => a['1 month change'] - b['1 month change'],
      sortDirections: ['descend', 'ascend'],
      ...numericFilters('1 month change', searchInput, handleSearch,
      rowSelection, handleReset,
       setSearchText, setSearchedColumn, searchedColumn, searchText),
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>0) ? 'green' : (rate<0) ? 'red' : 'gray'} key={rate}>
              {rate}%
              </Tag>
        </span>
      ))
    },
    {
      title: '1 Year Change',
      dataIndex: '1 year change',
      key: '1 year change',
      width: '10%',
      sorter: (a, b) => a['1 year change'] - b['1 year change'],
      sortDirections: ['descend', 'ascend'],
      ...numericFilters('1 year change', searchInput, handleSearch,
      rowSelection, handleReset,
       setSearchText, setSearchedColumn, searchedColumn, searchText),
      render: ((rate: number) => (
        <span>
              <Tag color={(rate>0) ? 'green' : (rate<0) ? 'red' : 'gray'} key={rate}>
              {rate}%
              </Tag>
        </span>
      ))
    },
    {
      title: 'Remove from Favorites',
      key: 'operation',
      dataIndex: 'name',
      fixed: 'right',
      width: '10%',
      render: ((name: {countryCode: string, currencyName: string, currencySymbol: string, currencyCode: string}) => 
      <div className='remove' onClick={() => {
        editFavorites(name.currencyCode);
      }}
      title={`Remove ${name.currencyCode} from favorites`}>
          <img src="./images/broken-heart.png" alt={`Remove ${name.currencyCode} from favorites`} />
          {name.currencyCode}
      </div>
      ),
    },
  ]

  return <Fragment>
          <div className='table'>
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
                {!loading?
                <Table scroll={{x:1000, y:350}} size='small' sticky={true} bordered={true} pagination={{position: ["topRight"], hideOnSinglePage: true}} columns={columns} dataSource={favData} rowKey={(record) => record.key}/>
                : <Loading item='Data'/>}
            </div>;
          </Fragment>
};

