import {
    useRef,
    useState,
    ReactElement,
    useContext,
    useEffect,
    CSSProperties,
    Fragment,
    ReactNode,
} from 'react'
import {
    Button,
    Input,
    Space,
    Table,
    InputRef,
    Tag,
    Drawer,
    DrawerProps,
} from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { FilterConfirmProps, SorterResult } from 'antd/es/table/interface'
// import Highlighter from 'react-highlight-words';
// import myButton from '../Button/Button';
import './Table.css'
import Mybutton from '../Button/Button'
import { appContext } from '../../App'
// import { tableData } from '../../helpers/getTableData';
import Loading from '../Loading/Loading'
import MyDrawer from '../Drawer/myDrawer'
import { getDetails } from '../../helpers/getTableData'
import { DataType } from './Helpers/Table.Utilities'
import { getColumnSearchProps, numericFilters } from './Helpers/Table.Utilities'
import { tableFilters, tableSorters } from './Helpers/Table.Utilities'
import { FilterValue } from 'antd/es/table/interface'
import Indicator from './Helpers/Indicators'

type DataIndex = keyof DataType

export default function myTable(): ReactElement {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
    // const radioRef = useRef<Radio

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    // const [loading, setLoading] = useState(false);

    const [details, setDetail] = useState<{ name: string; code: string }>()
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    //state variables for keeping track of the filters and the sorters
    const [filters, setFilters] = useState<tableFilters>()
    const [sorters, setSorters] = useState<tableSorters>()
    // const [filters, setFilters] = useState<Record<string, FilterValue | null>>();
    // const [sorters, setSorters] = useState<SorterResult<DataType> | SorterResult<DataType>[]>([]);

    // //console.log("This is the selected Row key");
    // //console.log(selectedRowKeys);

    const {
        data,
        loading,
        setLoading,
        favorites,
        editFavorites,
        defValue,
        getData,
    }: {
        data: DataType[]
        loading: boolean
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
        favorites: string[]
        editFavorites: (code: string) => void
        defValue: { label: string; value: string | undefined }
        getData: (data: string) => void
    } = useContext(appContext)

    // const [tableData, setTableData] = useState<DataType[]>(data);
    // //console.log('xx', loading);

    function handleSortingFiltering(
        filters: Record<string, FilterValue | null>,
        sorters: SorterResult<DataType> | SorterResult<DataType>[]
    ) {
        const toFilter = filters as unknown as tableFilters
        const toSort = sorters as unknown as tableSorters
        setFilters(toFilter)
        setSorters(toSort)
    }

    // const [data, setData] = useState<DataType[]>();

    const start = () => {
        setLoading(true)
        // ajax request after empty completing
        getData(defValue.value as string)
        setTimeout(() => {
            setSelectedRowKeys([])
            setLoading(false)
        }, 1000)
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        //console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }

    const nameStyle: CSSProperties = {
        display: 'flex',
        // justifyContent: 'space-evenly'
    }

    const imageStyle: CSSProperties = {
        marginRight: '5%',
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            fixed: 'left',
            ...getColumnSearchProps(
                'name',
                searchInput,
                handleSearch,
                rowSelection,
                handleReset,
                setSearchText,
                setSearchedColumn,
                searchedColumn,
                searchText
            ),
            render: (name: {
                countryCode: string
                currencyName: string
                currencySymbol: string
                currencyCode: string
            }) => (
                <div style={nameStyle} title={`${name.currencyName}`}>
                    <div
                        className="name-image"
                        onClick={() => {
                            editFavorites(name.currencyCode)
                        }}
                    >
                        {favorites.includes(name.currencyCode) ? (
                            <img
                                title={`Remove ${name.currencyCode} from favorites`}
                                src="./images/red-heart.png"
                                alt="red-heart"
                            />
                        ) : (
                            <img
                                title={`Add ${name.currencyCode} to favorites`}
                                src="./images/black-heart.png"
                                alt="black-heart"
                            />
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {/* <span>{name.currencySymbol}</span> */}
                        <br />
                        <div>
                            <img
                                style={imageStyle}
                                alt={name.currencyCode}
                                src={`https://flagsapi.com/${name.countryCode}/shiny/16.png`}
                            />
                        </div>
                        <br />
                        <span>{name.currencyCode}</span>
                        <br />
                        <span>{`(${name.currencyName})`}</span>
                        {/* <span>{name.currencyCode}</span> */}
                    </div>
                </div>
            ),
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            width: '10%',
            sorter: (a, b) => a.rate - b.rate,
            sortDirections: ['descend', 'ascend'],
            ...numericFilters(
                'rate',
                searchInput,
                handleSearch,
                rowSelection,
                handleReset,
                setSearchText,
                setSearchedColumn,
                searchedColumn,
                searchText
            ),
            render: (rate: number, record: DataType) => (
                <span>
                    <Tag
                        color={
                            record.rate > 1
                                ? 'green'
                                : record.rate < 1
                                ? 'red'
                                : 'gray'
                        }
                        key={rate}
                    >
                        {record.name.currencySymbol + ' ' + record.rate}
                    </Tag>
                </span>
            ),
        },
        {
            title: '24 hour change',
            dataIndex: '24 hour change',
            key: '24 hour change',
            width: '10%',
            sorter: (a, b) => a['24 hour change'] - b['24 hour change'],
            sortDirections: ['descend', 'ascend'],
            ...numericFilters(
                '24 hour change',
                searchInput,
                handleSearch,
                rowSelection,
                handleReset,
                setSearchText,
                setSearchedColumn,
                searchedColumn,
                searchText
            ),
            render: (rate: number) => (
                <span>
                    <Tag
                        color={rate > 0 ? 'green' : rate < 0 ? 'red' : 'gray'}
                        key={rate}
                    >
                        {rate}%
                    </Tag>
                </span>
            ),
        },
        {
            title: '7 Day Change',
            dataIndex: '7 day change',
            key: '7 day change',
            width: '10%',
            sorter: (a, b) => a['7 day change'] - b['7 day change'],
            sortDirections: ['descend', 'ascend'],
            ...numericFilters(
                '7 day change',
                searchInput,
                handleSearch,
                rowSelection,
                handleReset,
                setSearchText,
                setSearchedColumn,
                searchedColumn,
                searchText
            ),
            render: (rate: number) => (
                <span>
                    <Tag
                        color={rate > 0 ? 'green' : rate < 0 ? 'red' : 'gray'}
                        key={rate}
                    >
                        {rate}%
                    </Tag>
                </span>
            ),
        },
        {
            title: '1 Month Change',
            dataIndex: '1 month change',
            key: '1 month change',
            width: '10%',
            sorter: (a, b) => a['1 month change'] - b['1 month change'],
            sortDirections: ['descend', 'ascend'],
            ...numericFilters(
                '1 month change',
                searchInput,
                handleSearch,
                rowSelection,
                handleReset,
                setSearchText,
                setSearchedColumn,
                searchedColumn,
                searchText
            ),
            render: (rate: number) => (
                <span>
                    <Tag
                        color={rate > 0 ? 'green' : rate < 0 ? 'red' : 'gray'}
                        key={rate}
                    >
                        {rate}%
                    </Tag>
                </span>
            ),
        },
        {
            title: '1 Year Change',
            dataIndex: '1 year change',
            key: '1 year change',
            width: '10%',
            sorter: (a, b) => a['1 year change'] - b['1 year change'],
            sortDirections: ['descend', 'ascend'],
            ...numericFilters(
                '1 year change',
                searchInput,
                handleSearch,
                rowSelection,
                handleReset,
                setSearchText,
                setSearchedColumn,
                searchedColumn,
                searchText
            ),
            render: (rate: number) => (
                <span>
                    <Tag
                        color={rate > 0 ? 'green' : rate < 0 ? 'red' : 'gray'}
                        key={rate}
                    >
                        {rate}%
                    </Tag>
                </span>
            ),
        },
        {
            title: 'Show Details',
            key: 'operation',
            dataIndex: 'name',
            fixed: 'right',
            width: '5%',
            render: (name: { currencyCode: string; currencyName: string }) => (
                <Button
                    title={`Show ${name.currencyName} Details`}
                    onClick={() => {
                        setOpenDrawer(true)
                        setDetail({
                            name: name.currencyName,
                            code: name.currencyCode,
                        })
                        // getDetails(defValue, name.currencyName)
                    }}
                >
                    <div style={{ fontWeight: 'bolder' }}>...</div>
                </Button>
            ),
        },
    ]

    return (
        <Fragment>
            <div className="table">
                <div>
                    <div className="buttons-above-table">
                        <Mybutton />
                        {(sorters?.order ||
                            (filters !== undefined &&
                                Object.values(filters).some(
                                    (value) => value !== null
                                ))) && (
                            <Indicator
                                sorters={sorters as tableSorters}
                                filters={filters as tableFilters}
                            />
                        )}
                        <Button
                            title="Refresh"
                            type="default"
                            onClick={start}
                            disabled={false}
                            loading={loading}
                        >
                            {!loading && (
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <polyline points="1 4 1 10 7 10"></polyline>
                                    <polyline points="23 20 23 14 17 14"></polyline>
                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                                </svg>
                            )}
                        </Button>
                    </div>
                </div>
                {!loading ? (
                    <Table
                        onChange={(pagination, filters, sorters) => {
                            handleSortingFiltering(filters, sorters)
                        }}
                        scroll={{ x: 1000, y: 350 }}
                        size="small"
                        sticky={true}
                        bordered={true}
                        pagination={{
                            position: ['topRight'],
                            hideOnSinglePage: true,
                        }}
                        columns={columns}
                        dataSource={data}
                        rowKey={(record) => record.key}
                    />
                ) : (
                    <Loading item="Data" />
                )}
                <MyDrawer
                    getInfo={
                        getDetails as (
                            base: string,
                            symbol: string
                        ) => Promise<object>
                    }
                    details={details as { name: string; code: string }}
                    drawer={openDrawer}
                    openDrawer={setOpenDrawer}
                />
            </div>
            ;
        </Fragment>
    )
}
