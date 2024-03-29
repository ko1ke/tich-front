import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { RootState } from '../store';
import {
  signInEmail,
  signUpEmail,
  signInGoogle,
  signOut,
  getIdToken,
} from '../api/firebase';
import { createUser } from '../api/user';
import type { User, UserAuthentication, UserCredential } from '../typings';

type ThunkApiConfig = {
  rejectValue: {
    error: any;
  };
};

const initialState: User = {
  isAuthenticated: null,
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
      const res = await signInEmail(user);
      const idToken = await getIdToken();
      dispatch(push('/'));
      const { email, uid, displayName, photoURL } = res.user;
      return { idToken, email, uid, displayName, photoURL };
    } catch (e) {
      return rejectWithValue({
        error: { message: e?.message },
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
    const res = await signUpEmail(user);
    const idToken = await getIdToken();
    const { email, uid, displayName, photoURL } = res.user;
    await createUser({ token: idToken });
    dispatch(push('/'));
    return { idToken, email, uid, displayName, photoURL };
  } catch (e) {
    return rejectWithValue({
      error: { message: e?.message },
    });
  }
});

export const createGoogleUser = createAsyncThunk<
  UserAuthentication,
  void,
  ThunkApiConfig
>('googleUser/create', async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await signInGoogle();
    const idToken = await getIdToken();
    dispatch(push('/'));
    const { email, uid, displayName, photoURL } = res.user;
    await createUser({ token: idToken });
    return { idToken, email, uid, displayName, photoURL };
  } catch (e) {
    return rejectWithValue({
      error: { message: e?.message },
    });
  }
});

export const removeCurrentUser = createAsyncThunk<void, void, ThunkApiConfig>(
  'currentUser/remove',
  async (_, { rejectWithValue }) => {
    try {
      await signOut();
      return;
    } catch (e) {
      return rejectWithValue({
        error: { message: e?.message },
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
      const { idToken, email, uid, displayName, photoURL } = action.payload;
      state.idToken = idToken;
      state.email = email;
      state.uid = uid;
      state.displayName = displayName;
      state.photoURL = photoURL;
      state.isAuthenticated = true;
    },
    resetAuthenticationError(state) {
      state.isAuthenticationError = null;
    },
  },
  extraReducers(builder) {
    // fetchEmailUserの正常終了で発火
    builder.addCase(
      fetchEmailUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        const { idToken, email, uid, displayName, photoURL } = action.payload;
        state.idToken = idToken;
        state.email = email;
        state.uid = uid;
        state.displayName = displayName;
        state.photoURL = photoURL;
        state.isAuthenticationError = false;
        state.isAuthenticated = true;
        state.success = { message: 'Log in as an email user' };
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
        const { idToken, email, uid, displayName, photoURL } = action.payload;
        state.idToken = idToken;
        state.email = email;
        state.uid = uid;
        state.displayName = displayName;
        state.photoURL = photoURL;
        state.isAuthenticationError = false;
        state.isAuthenticated = true;
        state.success = { message: 'Created an account as an email user' };
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
        const { idToken, email, uid, displayName, photoURL } = action.payload;
        state.idToken = idToken;
        state.email = email;
        state.uid = uid;
        state.displayName = displayName;
        state.photoURL = photoURL;
        state.isAuthenticationError = false;
        state.isAuthenticated = true;
        state.success = { message: 'Log in as a Google user' };
      }
    );
    builder.addCase(createGoogleUser.rejected, (state, action) => {
      console.error(action.payload?.error);
      state.error = action.payload?.error;
      state.isAuthenticationError = true;
    });
    builder.addCase(removeCurrentUser.fulfilled, (state) => {
      state.idToken = '';
      state.email = '';
      state.uid = '';
      state.displayName = '';
      state.photoURL = '';
      state.isAuthenticationError = false;
      state.isAuthenticated = false;
      state.success = { message: 'Logged out' };
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
