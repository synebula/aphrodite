export default {
    namespace: 'globle',

    state: {
        number: 1,
        theme: { name: 'dark', color: "#031529" },
        themes: { dark: { name: 'dark', color: "#031529" }, light: { name: 'light', color: "#fff" } }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            // eslint-disable-line
            history.listen(location => {
                console.log(1, location);
            });
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            // eslint-disable-line
            yield put({ type: 'save' });
        },
        *increment({ payload }, { call, put }) {
            // eslint-disable-line
            yield put({ type: 'increment1' });
        },
    },

    reducers: {
        increment1(state, action) {
            state.number += 1;
            return { ...state };
        },
        changeTheme(state, { payload }) {
            let theme = state.theme;
            if (payload && ['dark', 'light'].includes(payload)) {
                theme = themes[payload];
            }
            else {
                if (theme.name == 'dark') theme = state.themes.light;
                else theme = state.themes.dark;
            }
            return {
                ...state,
                theme
            }
        }
    },
};
