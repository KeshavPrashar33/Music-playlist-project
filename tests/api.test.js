const request = require('supertest');
const app = require('../src/server');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth API', () => {
  test('register + login flow', async () => {
    const reg = await request(app)
      .post('/api/register')
      .send({ username: 'prem', email: 'p@example.com', password: 'pass123' });
    expect(reg.statusCode).toBe(201);

    const login = await request(app)
      .post('/api/login')
      .send({ email: 'p@example.com', password: 'pass123' });
    expect(login.statusCode).toBe(200);
    expect(login.body.token).toBeTruthy();

    global.token = login.body.token;
  });
});

describe('Songs API', () => {
  let songId;

  test('create a new song', async () => {
    const res = await request(app)
      .post('/api/songs')
      .send({
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: 'Divide',
        genre: 'Pop',
        durationSeconds: 233
      });
    expect(res.statusCode).toBe(201);
    songId = res.body.song.id;
  });

  test('list all songs', async () => {
    const res = await request(app).get('/api/songs');
    expect(res.statusCode).toBe(200);
    expect(res.body.songs.length).toBeGreaterThan(0);
  });

  test('update a song', async () => {
    const res = await request(app)
      .put(`/api/songs/${songId}`)
      .send({ genre: 'Pop-Rock' });
    expect(res.statusCode).toBe(200);
  });

  test('delete a song', async () => {
    const res = await request(app).delete(`/api/songs/${songId}`);
    expect(res.statusCode).toBe(200);
  });
});

describe('Playlists API (requires auth)', () => {
  let playlistId, songId;

  test('create playlist', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${global.token}`)
      .send({ name: 'Favorites', description: 'My best tracks' });
    expect(res.statusCode).toBe(201);
    playlistId = res.body.playlist.id;
  });

  test('create song to add into playlist', async () => {
    const res = await request(app)
      .post('/api/songs')
      .send({
        title: 'Perfect',
        artist: 'Ed Sheeran',
        album: 'Divide',
        genre: 'Romantic',
        durationSeconds: 240
      });
    expect(res.statusCode).toBe(201);
    songId = res.body.song.id;
  });

  test('add song to playlist', async () => {
    const res = await request(app)
      .patch(`/api/playlists/${playlistId}/add-song/${songId}`)
      .set('Authorization', `Bearer ${global.token}`);
    expect(res.statusCode).toBe(200);
  });

  test('get user playlists', async () => {
    const res = await request(app)
      .get('/api/playlists')
      .set('Authorization', `Bearer ${global.token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.playlists)).toBe(true);
  });

  test('delete playlist', async () => {
    const res = await request(app)
      .delete(`/api/playlists/${playlistId}`)
      .set('Authorization', `Bearer ${global.token}`);
    expect(res.statusCode).toBe(200);
  });
});
