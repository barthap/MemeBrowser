DROP TABLE IF EXISTS Memes;

drop table if exists fts_memes;

drop trigger if exists after_meme_insert;
drop trigger if exists after_meme_update;
drop trigger if exists after_meme_delete;