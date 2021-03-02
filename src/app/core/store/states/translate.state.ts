export interface TranslateState {
  language: string;
}

export interface TranslateStateUnion {
  language: TranslateState;
}

export const initialTranslateState = {
  language: 'pt-br'
};
