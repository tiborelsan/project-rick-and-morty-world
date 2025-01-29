import Favorite from '@/models/favorite';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    items: Favorite[];
}

const initialState: FavoritesState = {
    items: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Favorite>) => {
            if(!state.items.some(e => e.id === action.payload.id)) {
                state.items.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<Favorite>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
    },
});

// Export des actions
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Export du reducer
export default favoritesSlice.reducer;
