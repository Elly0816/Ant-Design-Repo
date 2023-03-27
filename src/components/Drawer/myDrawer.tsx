import { Button, Drawer, DrawerProps, Space } from "antd";
import { ReactElement, useEffect, useState, useContext, CSSProperties, Fragment } from "react";
import './myDrawer.css';
import Loading from "../Loading/Loading";
import { getDetails } from "../../helpers/getTableData";
import { appContext } from "../../App";
import Stats from "../Stats/Stats";
import { tsController } from "../../api/exchange";




type Data = [
    string, {
        [key: string] : number
    }
];


export default function MyDrawer({drawer, openDrawer, details, getInfo}:
    {drawer: boolean,
    openDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    details: {name: string, code: string} | undefined,
    getInfo: (base: string, symbol: string) => Promise<object>}): ReactElement{

    const {defValue} : {defValue: {label: string, value: string|undefined}} = useContext(appContext);
    const [open, setOpen] = useState<boolean>(drawer);
    const [size, setSize] = useState<DrawerProps['size']>();
    const [info, setInfo] = useState<Data[]>()
    const [max, setMax] = useState<Data>();
    const [min, setMin] = useState<Data>();
    const [avg, setAvg] = useState<number>();
    const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
    
      const onClose = () => {
        setOpen(false);
        openDrawer(false);
        setAvg(undefined);
      };

      
      useEffect(() => {
        setOpen(drawer);
        // setMax(entries.reduce((max, entry) => entry[1].[codeToSend]))
        const mediaQueryList = window.matchMedia("(min-width: 768px)");
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        mediaQueryList.addEventListener('change', listener);
          console.log('This is the def value');
          console.log(defValue.value);
          if (drawer && details){
            console.log(`here are the details: ${details}`);
            const value: string = defValue.value as string;
            console.log('here is the value: '+value);
            const codeToSend = details?.code as string;
            console.log('here is the code: '+details?.code);
            getInfo(value, codeToSend)
            .then(res => {
                console.log(res);
                const entries = Object.entries(res) as Data[];
                console.log('entries array');
                console.log(entries);
                let maxIndex = 0;
                let maxValue = entries[0][1][codeToSend];
                let minIndex = 0;
                let minValue = entries[0][1][codeToSend];
                let sum = 0;
                for (let i=0; i< entries.length; i++){
                    let currentValue = entries[i][1][codeToSend];
                    if (currentValue > maxValue){
                        maxValue = currentValue;
                        maxIndex = i
                    }

                    if (currentValue < minValue){
                        minValue = currentValue;
                        minIndex = i;
                    }
                    sum += currentValue;
                }
                let averageValue = sum / entries.length;
                setMax(entries[maxIndex]);
                setMin(entries[minIndex]);
                setAvg(averageValue);
                // setInfo(entries as unknown as Data[]);
              });
              return () => {
              tsController.abort();
              mediaQueryList.removeEventListener('change', listener);
            }
        }

      }, [drawer, details]);



      // const drawerStyle: CSSProperties = {
      //   hover
      // }

    return <Fragment>
            <div className='drawer'>
              <Drawer
              title={`${details?.name} Info`}
              placement="right"
              size={matches? 'large' : 'default'}
              onClose={onClose}
              open={open}
              // extra={
              //   <Space>
              //     <Button onClick={onClose}>Cancel</Button>
              //     <Button type="primary" onClick={onClose}>
              //       OK
              //     </Button>
              //   </Space>
              // }
            >
              {avg ? 
              <div className='details'>  
                <Stats max={max as Data} min={min as Data} avg={avg as number} curr={details?.code as string} base={defValue.value as string}/>
              </div>
              :
              <div className="loading-details">
                <Loading item="Stats"/>
              </div> 
              }
            </Drawer>
            </div>
          </Fragment>
}

