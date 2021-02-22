import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from '../store';
import {
  signInEmail,
  signUpEmail,
  signInGoogle,
  signOut,
} from '../api/firebase';

type User = {
  email?: string | null;
  uid?: string;
  displayName?: string | null;
  photoURL?: string | null;
  isAuthenticationError?: boolean;
  isAuthenticated?: boolean;
  error?: any;
};

type UserAuthentication = {
  email?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
};

type UserCredential = {
  email: string;
  password: string;
  password_confirmation?: string;
};

type ThunkApiConfig = {
  rejectValue: {
    error: any;
  };
};

const initialState: User = {
  isAuthenticated: false,
  isAuthenticationError: false,
};

// 非同期通信はcreateSliceで定義できないので、予めcreateAsyncThunkで作成しておく
// createAsyncThunkのジェネリクスは<返り値, 引数, thunkAPI>となる
export const fetchEmailUser = createAsyncThunk<
  UserAuthentication,
  UserCredential,
  ThunkApiConfig
>(
  'emailUser/fetch',
  // 第二引数でthunkAPIを受け取る
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const res: any = await signInEmail(user);
      dispatch(push('/'));
      const { email, uid, displayName, photoURL } = res.user;
      return { email, uid, displayName, photoURL };
    } catch (e) {
      return rejectWithValue({
        error: e,
      });
    }
  }
);

export const createEmailUser = createAsyncThunk<
  UserAuthentication,
  UserCredential,
  ThunkApiConfig
>('emailUser/create', async (user, { dispatch, rejectWithValue }) => {
  try {
    const res: any = await signUpEmail(user);
    dispatch(push('/'));
    const { email, uid, displayName, photoURL } = res.user;
    return { email, uid, displayName, photoURL };
  } catch (e) {
    return rejectWithValue({
      error: e,
    });
  }
});

export const createGoogleUser = createAsyncThunk<
  UserAuthentication,
  void,
  ThunkApiConfig
>('googleUser/create', async (_, { dispatch, rejectWithValue }) => {
  try {
    const res: any = await signInGoogle();
    dispatch(push('/'));
    const { email, uid, displayName, photoURL } = res.user;
    return { email, uid, displayName, photoURL };
  } catch (e) {
    return rejectWithValue({
      error: e,
    });
  }
});

export const removeCurrentUser = createAsyncThunk<void, void, ThunkApiConfig>(
  'currentUser/remove',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOut();
      dispatch(push('/login'));
      return;
    } catch (e) {
      return rejectWithValue({
        error: e,
      });
    }
  }
);

// ActionType、Reducer、Actionをまとめて定義
const slice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    fetchCurrentUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.isAuthenticated = true;
    },
    resetAuthenticationError(state) {
      state.isAuthenticationError = false;
    },
  },
  extraReducers(builder) {
    // fetchEmailUserの正常終了で発火
    builder.addCase(
      fetchEmailUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        const { email, uid, displayName, photoURL } = action.payload;
        state.email = email;
        state.uid = uid;
        state.displayName = displayName;
        state.photoURL = photoURL;
        state.isAuthenticationError = false;
        state.isAuthenticated = true;
      }
    );
    // fetchEmailUser内でrejectWithValue関数が呼ばれると発火
    builder.addCase(fetchEmailUser.rejected, (state, action) => {
      console.error(action.payload?.error);
      state.error = action.payload?.error;
      state.isAuthenticationError = true;
    });
    builder.addCase(
      createEmailUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        const { email, uid, displayName, photoURL } = action.payload;
        state.email = email;
        state.uid = uid;
        state.displayName = displayName;
        state.photoURL = photoURL;
        state.isAuthenticationError = false;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(createEmailUser.rejected, (state, action) => {
      console.error(action.payload?.error);
      state.error = action.payload?.error;
      state.isAuthenticationError = true;
    });
    builder.addCase(
      createGoogleUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        const { email, uid, displayName, photoURL } = action.payload;
        state.email = email;
        state.uid = uid;
        state.displayName = displayName;
        state.photoURL = photoURL;
        state.isAuthenticationError = false;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(createGoogleUser.rejected, (state, action) => {
      console.error(action.payload?.error);
      state.error = action.payload?.error;
      state.isAuthenticationError = true;
    });
    builder.addCase(removeCurrentUser.fulfilled, (state) => {
      state.email = '';
      state.uid = '';
      state.displayName = '';
      state.photoURL = '';
      state.isAuthenticationError = false;
      state.isAuthenticated = false;
    });
    builder.addCase(removeCurrentUser.rejected, (state, action) => {
      console.error(action.payload?.error);
      state.error = action.payload?.error;
      state.isAuthenticationError = true;
    });
  },
});

export const { fetchCurrentUser, resetAuthenticationError } = slice.actions;
export const selectUser = (state: RootState) => state.currentUser;

export const currentUserReducer = slice.reducer;
