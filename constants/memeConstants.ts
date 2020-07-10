

export const MemeConstants = {
    MEMES_LOAD: 'LOAD_MEMES',
    MEMES_LOAD_SUCCESS: 'LOAD_MEMES_SUCCESS',
    MEMES_LOAD_FAILURE: 'LOAD_MEMES_FAILURE',

    ADD_MEMES: 'ADD_MEMES',
    ADD_MEMES_SUCCESS: 'ADD_MEMES_SUCCESS',
    ADD_MEMES_FAILURE: 'ADD_MEMES_FAILURE',

    UPDATE_MEME: 'UPDATE_MEME',
    DELETE_MEME: 'DELETE_MEME'
};

export type MEMES_LOAD = typeof MemeConstants.MEMES_LOAD;
export type MEMES_LOAD_SUCCESS = typeof MemeConstants.MEMES_LOAD_SUCCESS;
export type MEMES_LOAD_FAILURE = typeof MemeConstants.MEMES_LOAD_FAILURE;

export type MEMES_STATUS = MEMES_LOAD_SUCCESS | MEMES_LOAD_FAILURE;

export type ADD_MEMES = typeof MemeConstants.ADD_MEMES;
export type ADD_MEMES_SUCCESS = typeof MemeConstants.ADD_MEMES_SUCCESS;
export type ADD_MEMES_FAILURE = typeof MemeConstants.ADD_MEMES_FAILURE;
export type ADD_MEMES_STATUS = ADD_MEMES_SUCCESS | ADD_MEMES_FAILURE;

export type UPDATE_MEME = typeof MemeConstants.UPDATE_MEME;
export type DELETE_MEME = typeof MemeConstants.DELETE_MEME;