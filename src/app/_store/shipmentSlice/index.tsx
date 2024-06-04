import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ShipmentItem {
    id: number,
    company: string,
    route: {
        fromLabel: string,
        fromCity: string,
        fromDistrict: string,
        toLabel: string,
        toCity: string,
        toDistrict: string,
    },
    vehicle: {
        plateNumber: string,
        model: string,
    },
    driver: {
        name: string,
        phone: string,
    },
    date: string,
    price: string,
    status: {
        label: string,
        type: "success" | "info" | "warning" | "danger",
    }
}

export interface ShipmentState {
    shipment: ShipmentItem[],
    shipmentFetchListLoading: boolean,
    shipmentFetchListError: string
}

// Shipment list
export const shipmentFetchList = createAsyncThunk<any, void>('shipment/list', async () => {
    const response = await axios.get('https://api-dev.kamion.co/api/v2/admin/shipment', {  
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} 
        });
    return response.data;
});

const initialState: ShipmentState = {
    shipment: [],
    shipmentFetchListLoading: true,
    shipmentFetchListError: '',
};

const shipmentSlice = createSlice({
    name: 'shipment',
    initialState,
    reducers: {
        shipmentListClear: (state) => {
            state.shipment = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(shipmentFetchList.pending, (state, action) => {
                state.shipmentFetchListLoading = true;
                state.shipmentFetchListError = '';
            })
            .addCase(shipmentFetchList.fulfilled, (state, action) => {
                if(action.payload.error_code !== 0) {
                    state.shipmentFetchListLoading = false;
                    state.shipmentFetchListError = action.payload.message || '';
                    return;
                }

                console.log(action.payload.data);

                state.shipment = action.payload.data.map((d: any) => ({
                    id: d.id,
                    company: d?.shipper?.name || '-',
                    route: {
                        fromLabel: d?.departure_address?.name,
                        fromCity: d?.departure_address?.city?.name,
                        fromDistrict: d?.departure_address?.district?.name,
                        toLabel: d?.delivery_address?.name,
                        toCity: d?.delivery_address?.city?.name,
                        toDistrict: d?.delivery_address?.district?.name,
                    },
                    vehicle: {
                        plateNumber: d?.vehicle ? d?.vehicle?.plate || '-' : d?.trailer?.plate || '-',
                        model: d?.vehicle ? `${d?.vehicle?.group_type_value || ''} ${d?.vehicle?.type_value || '-'}` : d?.trailer?.type_value || '-',
                    },
                    driver: {
                        name: d?.driver?.name && d?.driver?.surname ? `${d?.driver?.name} ${d?.driver?.surname}` : '-',
                        phone: d?.driver?.phone || '-',
                    },
                    date: d?.pick_up_date,
                    price: d?.price?.carrier?.carrier_price,
                    status: {
                        label: d?.latest_status?.type_value,
                        type: d?.latest_status?.type === 11 ? 'success' : 'info'
                    },
                }));
        
                state.shipmentFetchListLoading = false;
            })
            .addCase(shipmentFetchList.rejected, (state, action) => {
                state.shipmentFetchListLoading = false;
                state.shipmentFetchListError = action.error.message || 'Faild to fetch shipment list!';
            })
    }
});

export default shipmentSlice.reducer;