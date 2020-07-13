/* eslint-disable no-underscore-dangle */
import { delay } from '../util/quickUtils';
import db from './db';
import { MemeEntity } from './entity';

const fakeData: MemeEntity[] = [
    { assetId: '1', uri: '', name: 'Img 1', content: 'meme 1', createdAt: '' },
    { assetId: '2', uri: '', name: 'Img 2', content: 'meme 2', createdAt: '' },
    { assetId: '3', uri: '', name: 'Img 3', content: 'meme 3', createdAt: '' },
    { assetId: '4', uri: '', name: 'Img 4', content: 'meme 4', createdAt: '' },
    { assetId: '5', uri: '', name: 'Img 5', content: 'meme 5', createdAt: '' },
    { assetId: '6', uri: '', name: 'Img 6', content: 'meme 6', createdAt: '' },
    { assetId: '7', uri: '', name: 'Img 7', content: 'meme 7', createdAt: '' }
];

const MemeRepository = {
    async getAllFake(): Promise<MemeEntity[]> {
        await delay(1500); // fake delay
        return Promise.resolve(fakeData);
    },

    async getAll(onlyIds = false): Promise<MemeEntity[]> {
        return db.transaction(async (tx) => {
            const sql = `select ${onlyIds ? 'assetId' : '*'} from Memes`;
            const res = await tx.query(sql);
            return res.rows._array as MemeEntity[];
        });
    },

    async getMoreLike(phrase: string): Promise<MemeEntity[]> {
        return db.transaction(async (tx) => {
            const r = await tx.query<MemeEntity>(
                'SELECT M.* from fts_memes JOIN Memes M ON (M.id=fts_memes.rowid) WHERE fts_memes MATCH ?',
                [phrase]
            );
            console.log('Found', r.rows.length, 'matching items');
            return r.rows._array;
        });
    },

    async addNewMemes(newMemes: MemeEntity[]): Promise<MemeEntity[]> {
        const currentIds = await MemeRepository.getAll(true);

        return db.transaction(async (tx) => {
            // prevent duplicates when user selected the same image again
            const memesToAdd = newMemes.filter(
                (meme) =>
                    currentIds.findIndex(
                        (el) => el.assetId === meme.assetId
                    ) < 0
            );

            if (memesToAdd.length > 0) {
                const queryString = memesToAdd
                    .map(
                        (m) =>
                            `('${m.assetId}', '${m.uri}', '${m.createdAt}', '${m.name}', '${m.content}')`
                    )
                    .join(', ');

                tx.exec(
                    `insert into Memes (assetId, uri, createdAt, name, content) values ${ 
                        queryString 
                        };`
                );
            }

            return Promise.resolve(memesToAdd);
        });
    },

    async updateMeme(meme: MemeEntity) {
        const { name, content, assetId } = meme;
        return db.transaction(async (tx) => {
            tx.exec('UPDATE Memes SET name=?, content=? WHERE assetId=?', [
                name,
                content,
                assetId
            ]);
        });
    },

    async removeMeme(assetId: string) {
        return db.transaction(async (tx) => {
            tx.exec('DELETE FROM Memes WHERE assetId=?', [assetId]);
        });
    }
};

export default MemeRepository;