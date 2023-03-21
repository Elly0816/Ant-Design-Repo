import Table from "../../components/Tables/Currencies";
import {ReactElement, useContext, useEffect} from 'react';
import Header from '../../components/Header/Header';



export default function Home(): ReactElement {


return <div>
        <Header/>
        <Table/>
    </div>
}