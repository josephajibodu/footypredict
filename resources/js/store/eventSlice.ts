import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SelectedSportEvent} from "@/types";

interface EventState {
    selectedEvents: SelectedSportEvent[]
}

const initialState: EventState = {
    selectedEvents: []
}

const sportEventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        selectSportEvent: (state, action: PayloadAction<SelectedSportEvent>) => {
            const existingEventIndex = state.selectedEvents.findIndex(
                (event) => event.id === action.payload.id
            );

            if (existingEventIndex === -1) {
                state.selectedEvents.push(action.payload);
            } else {
                state.selectedEvents = state.selectedEvents.map((event, index) =>
                    index === existingEventIndex
                        ? { ...event, option: action.payload.betOption }
                        : event
                );
            }
        },
        deselectSportEvent: (state, action: PayloadAction<number>) => {
            state.selectedEvents = state.selectedEvents.filter(
                (event) => event.id !== action.payload
            );
        },
        clearSelectedSportEvents: (state) => {
            state.selectedEvents = [];
        }
    }
});


// Action creators are generated for each case reducer function
export const { selectSportEvent, deselectSportEvent, clearSelectedSportEvents } = sportEventSlice.actions
export default sportEventSlice.reducer;