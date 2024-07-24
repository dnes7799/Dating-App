import { createSlice } from '@reduxjs/toolkit';

const getInitialMode = () => {
	const storedMode = localStorage.getItem('mode');
	return storedMode !== null ? storedMode : 'light';
};

const initialState = {
	mode: getInitialMode(),
	baseUrl: "https://devapi.storygraber.com",
	darkMode: false,
	showBottomNav: true,
	//baseUrl: 'http://localhost:8000'

};

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setMode: state => {
			const newMode = state.mode === 'light' ? 'dark' : 'light';
			localStorage.setItem('mode', newMode);
			state.mode = newMode;
		},
		setDarkMode: (state, action) => {
			state.darkMode = action.payload
		},
		setShowBottomNav: (state, action) => {
			state.showBottomNav = action.payload
		}
	
	},
});

export const { setMode, setDarkMode, setShowBottomNav } = globalSlice.actions;

export default globalSlice.reducer;