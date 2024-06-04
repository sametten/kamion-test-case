'use client'

// React
import { use, useEffect } from 'react'

// Components
import CompanyCellAtom from "@/app/_components/atom/CompanyCellAtom"
import TruckCellAtom from "@/app/_components/atom/TruckCellAtom"
import ProfileCellAtom from "@/app/_components/atom/ProfileCellAtom"
import DateCellAtom from "@/app/_components/atom/DateCellAtom"
import PriceCellAtom from "@/app/_components/atom/PriceCellAtom"
import IdCellAtom from "@/app/_components/atom/IdCellAtom"
import TagCellAttom from "@/app/_components/atom/TagCellAttom"
import RouteCellAtom from "@/app/_components/atom/RouteCellAtom"
import CheckAtom from "@/app/_components/atom/CheckAtom"

import TableMolecule, { TableHeadMolecule, TableHeadCellMolecule, TableBodyMolecule, TableRowMolecule, TableCellMolecule } from "@/app/_components/molecules/TableMolecule";
import PageHeaderMolecule from "@/app/_components/molecules/PageHeaderMolecule";

// Redux
import type { RootState, AppDispatch } from '@/app/_store/store';
import { useSelector, useDispatch } from 'react-redux';
import { shipmentFetchList } from '@/app/_store/shipmentSlice';

/**1
 * DashboardHome component
 */

export default function DashboardHome(): React.JSX.Element {

    // Store
    const dispatch: AppDispatch = useDispatch();
    const shipmentList = useSelector((state: RootState) => state.shipment.shipment);
    const shipmentFetchListLoading = useSelector((state: RootState) => state.shipment.shipmentFetchListLoading);
    const shipmentFetchListError = useSelector((state: RootState) => state.shipment.shipmentFetchListError);

    // Fetch shipment list
    useEffect(() => {
        dispatch(shipmentFetchList());
    }, [dispatch]);

    useEffect(() => {
        console.log(shipmentList);
    }, [shipmentList])

    return (
        <section>
            <PageHeaderMolecule />
            <TableMolecule skeleton={shipmentFetchListLoading}>
                <TableHeadMolecule>
                    <TableRowMolecule>
                        <TableHeadCellMolecule>SEÇ</TableHeadCellMolecule>
                        <TableHeadCellMolecule>ID</TableHeadCellMolecule>
                        <TableHeadCellMolecule align="left" className='w-[160px]'>FIRMA</TableHeadCellMolecule>
                        <TableHeadCellMolecule align="left">GÜZERGAH</TableHeadCellMolecule>
                        <TableHeadCellMolecule align="left">ARAÇ</TableHeadCellMolecule>
                        <TableHeadCellMolecule align="left" className='min-w-[180px]'>ŞÖFÖR</TableHeadCellMolecule>
                        <TableHeadCellMolecule>TARİH</TableHeadCellMolecule>
                        <TableHeadCellMolecule>FİYAT</TableHeadCellMolecule>
                        <TableHeadCellMolecule>DURUM</TableHeadCellMolecule>
                    </TableRowMolecule>
                </TableHeadMolecule>
                <TableBodyMolecule>
                    {!shipmentFetchListLoading && shipmentList.map((shipment, index) => 
                        <TableRowMolecule key={index}>
                            <TableCellMolecule align="center">
                                <CheckAtom/>
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <IdCellAtom 
                                    id={shipment.id}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule>
                                <CompanyCellAtom 
                                    name={shipment.company}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule>
                                <RouteCellAtom 
                                    fromLabel={shipment.route.fromLabel} 
                                    fromCity={shipment.route.fromCity} 
                                    fromDistrict={shipment.route.fromDistrict} 
                                    toLabel={shipment.route.toLabel} 
                                    toCity={shipment.route.toCity} 
                                    toDistrict={shipment.route.toDistrict}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="left">
                                <TruckCellAtom 
                                    plateNumber={shipment.vehicle.plateNumber} 
                                    truckModel={shipment.vehicle.model}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule>
                                <ProfileCellAtom 
                                    image={'/dummy-profile.jpg'} 
                                    fullName={shipment.driver.name} 
                                    phoneNumber={shipment.driver.phone}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <DateCellAtom 
                                    date={shipment.date}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <PriceCellAtom 
                                    price={shipment.price}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <TagCellAttom 
                                    text={shipment.status.label} 
                                    type={shipment.status.type} 
                                />
                            </TableCellMolecule>                            
                        </TableRowMolecule>
                    )}
                    {shipmentFetchListLoading && [...Array(15)].map((_, index) => 
                        <TableRowMolecule key={index}>
                            <TableCellMolecule align="center">
                                <CheckAtom 
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <IdCellAtom 
                                    id={12345}
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule>
                                <CompanyCellAtom 
                                    name={'####'}
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule>
                                <RouteCellAtom 
                                    fromLabel={'####'}
                                    fromCity={'####'}
                                    fromDistrict={'####'}
                                    toLabel={'####'}
                                    toCity={'####'}
                                    toDistrict={'####'}
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="left">
                                <TruckCellAtom 
                                    plateNumber={'####'}
                                    truckModel={'####'}
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule>
                                <ProfileCellAtom 
                                    image={'/dummy-profile.jpg'} 
                                    fullName={'####'} 
                                    phoneNumber={'####'}
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <DateCellAtom 
                                    date={'123123123123'}
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <PriceCellAtom 
                                    price={'123.32'}
                                    skeleton={true}
                                />
                            </TableCellMolecule>
                            <TableCellMolecule align="center">
                                <TagCellAttom 
                                    text={'####'} 
                                    type={'info'} 
                                    skeleton={true}
                                />
                            </TableCellMolecule>                            
                        </TableRowMolecule>                    
                    )}                   
                </TableBodyMolecule>
            </TableMolecule>
        </section>
    )
}