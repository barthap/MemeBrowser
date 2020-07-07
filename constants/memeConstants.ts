export const MemeConstants = {
    MEMES_LOAD: 'LOAD_MEMES',
    MEMES_LOAD_SUCCESS: 'LOAD_MEMES_SUCCESS',
    MEMES_LOAD_FAILURE: 'LOAD_MEMES_FAILURE',
};

export type MEMES_LOAD = typeof MemeConstants.MEMES_LOAD;
export type MEMES_LOAD_SUCCESS = typeof MemeConstants.MEMES_LOAD_SUCCESS;
export type MEMES_LOAD_FAILURE = typeof MemeConstants.MEMES_LOAD_FAILURE;

export type MEMES_STATUS = MEMES_LOAD_SUCCESS | MEMES_LOAD_FAILURE;