import { StateCreator } from 'zustand';

export type FormSlice = {
  storedForm: {
    name: string;
    description: string;
    price: number | '' | undefined;
    maxGuests: number | '' | undefined;
    media: { url: string; alt?: string | undefined }[];
    meta: { [key: string]: boolean };
    location: {
      country: string;
      city: string;
      address: string;
      zip: string;
    };
    rating?: number | undefined;
  };
  formPhase: string;
  setFormPhase: (phase: 'info' | 'images' | 'amenities' | 'location') => void;
  formIsDone: {
    info: boolean;
    images: boolean;
    amenities: boolean;
    location: boolean;
  };
  setFormIsDone: (phase: 'info' | 'images' | 'amenities' | 'location') => void;
  setStoredForm: (form: Partial<FormSlice['storedForm']>) => void;
  resetStoredForm: () => void;
};

const initialState: FormSlice = {
  storedForm: {
    name: '',
    description: '',
    price: undefined,
    maxGuests: undefined,
    media: [{ url: '', alt: '' }],
    meta: {},
    location: {
      country: '',
      city: '',
      address: '',
      zip: '',
    },
  },
  formPhase: 'info',
  formIsDone: {
    info: false,
    images: false,
    amenities: false,
    location: false,
  },
  setFormPhase: () => {},
  setStoredForm: () => {},
  resetStoredForm: () => {},
  setFormIsDone: () => {},
};

export const createFormSlice: StateCreator<FormSlice> = (set) => ({
  ...initialState,
  setStoredForm: (form) =>
    set((state) => ({ storedForm: { ...state.storedForm, ...form } })),
  resetStoredForm: () =>
    set({
      storedForm: initialState.storedForm,
      formPhase: 'info',
      formIsDone: initialState.formIsDone,
    }),
  setFormPhase: (phase) => set({ formPhase: phase }),
  setFormIsDone: (phase) =>
    set((state) => ({
      formIsDone: { ...state.formIsDone, [phase]: true },
    })),
});
