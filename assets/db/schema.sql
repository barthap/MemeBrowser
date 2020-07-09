
--DROP TABLE IF EXISTS Memes;

CREATE TABLE IF NOT EXISTS Memes (
  id integer primary key autoincrement,
  assetId char(100) not null,
  uri char(100) not null,
  createdAt timestamp not null,
  name char(50),
  content text
);

-- FTS;
CREATE virtual table if not exists fts_memes using fts4(name, content);

CREATE trigger IF NOT EXISTS after_meme_insert after insert on Memes begin
    insert into fts_memes (rowid, name, content) values (new.id, new.name, new.content);
END;
CREATE trigger IF NOT EXISTS after_meme_update after update on Memes begin
    update fts_memes set name=new.name, content=new.content where rowid=old.id;
END;
CREATE trigger IF NOT EXISTS after_meme_delete after delete on Memes begin
    delete from fts_memes where rowid=old.id;
END;