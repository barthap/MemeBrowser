import { MemeEntity } from "./entity";
import { delay } from "../util/delay";
import db from "./db";

const fakeData: MemeEntity[] = [
    {id: 1, path: "", name: "Img 1", content: "meme 1", createdAt: ""},
    {id: 2, path: "", name: "Img 2", content: "meme 2", createdAt: ""},
    {id: 3, path: "", name: "Img 3", content: "meme 3", createdAt: ""},
    {id: 4, path: "", name: "Img 4", content: "meme 4", createdAt: ""},
    {id: 5, path: "", name: "Img 5", content: "meme 5", createdAt: ""},
    {id: 6, path: "", name: "Img 6", content: "meme 6", createdAt: ""},
    {id: 7, path: "", name: "Img 7", content: "meme 7", createdAt: ""},
  ]
  

export const MemeRepository = {
    async getAllFake(): Promise<MemeEntity[]> {
        await delay(1500);  //fake delay
        return Promise.resolve(fakeData);
    },

    async getAll(): Promise<MemeEntity[]> {
        return db.transaction(async tx => {
            const res = await tx.query("select * from Memes;");
            return res.rows._array as MemeEntity[];
        });
    },

    async getMoreLike(phrase: string): Promise<MemeEntity[]> {
        return db.transaction(async tx => {
            const r = await tx.query<MemeEntity>(
                "SELECT M.* from fts_memes JOIN Memes M ON (M.id=fts_memes.rowid) WHERE fts_memes MATCH ?",
                [phrase]);
            console.log('Found', r.rows.length, 'matching items');
            return r.rows._array;
        });
    },
}