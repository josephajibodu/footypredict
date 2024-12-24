import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SelectedSportEvent} from "@/types";

interface EventState {
    selectedEvents: SelectedSportEvent[]
}

const initialState: EventState = {
    selectedEvents: []
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        selectEvent: (state, action: PayloadAction<SelectedSportEvent>) => {
            const existingEventIndex = state.selectedEvents.findIndex(
                (event) => event.id === action.payload.id
            );

            if (existingEventIndex === -1) {
                state.selectedEvents.push(action.payload);
            }
        },
        deselectEvent: (state, action: PayloadAction<number>) => {
            state.selectedEvents = state.selectedEvents.filter(
                (event) => event.id !== action.payload
            );
        },
        clearSelectedEvents: (state) => {
            state.selectedEvents = [];
        }
    }
});


// Action creators are generated for each case reducer function
export const { selectEvent, deselectEvent, clearSelectedEvents } = eventSlice.actions
export default eventSlice.reducer;