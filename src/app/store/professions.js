import { createSlice } from "@reduxjs/toolkit";
import professionService from "./../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        professionRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionRequested, professionRecieved, professionRequestFailed } =
    actions;

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(professionRequested());
    try {
        const { content } = await professionService.get();
        dispatch(professionRecieved(content));
    } catch (error) {
        dispatch(professionRequestFailed(error.message));
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (professionId) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find(
            (profession) => profession._id === professionId
        );
    }
    return {};
};

export default professionsReducer;
