// eslint-disable-next-line @typescript-eslint/no-require-imports
const sql = require('better-sqlite3');

import { isProcessProduction } from "@/helpers/isProcessProduction";

const db = new sql('banner.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS banner(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL
    )
`).run();

const bannerList = [
  {
    image: isProcessProduction ? '/Rick-Morty/banner/pickle-rick.jpg' : '/banner/pickle-rick.jpg',
  },
  {
    image: isProcessProduction ? '/Rick-Morty/banner/red_eyes.jpg' : '/banner/red_eyes.jpg',
  },
  {
    image: isProcessProduction ? '/Rick-Morty/banner/rick_arms.jpg' : '/banner/rick_arms.jpg',
  },
  {
    image: isProcessProduction ? '/Rick-Morty/banner/rick_computer.jpg' :
      '/banner/rick_computer.jpg',
  },
  {
    image: isProcessProduction ? '/Rick-Morty/banner/voilet_color.jpg' : '/banner/voilet_color.jpg',
  },
];


async function insertBanner() {
  const stmt = db.prepare(`
        INSERT INTO banner (image) VALUES (
            @image
        )
    `);


  for (const item of bannerList) {
    const exists = db.prepare('SELECT COUNT(*) FROM banner WHERE image = ?')
      .get(item.image)['COUNT(*)'];

    if (exists === 0) {
      stmt.run(item);
    }
  }
}

function clearBanner() {
  db.prepare('DELETE FROM banner').run();
}


clearBanner();
insertBanner();

export default db;
