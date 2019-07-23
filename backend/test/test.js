const chai = require('chai');
const expect = chai.expect;
const mongodb = require('mongo-mock');
const MongoClient = mongodb.MongoClient;
const model = require('../movies-model');

const COLLECTION_NAME = 'movies';

describe('Movies collection', () => {
    let connected_db;

    before((done) => {
        MongoClient.connect("mongodb://someserver/mock_database", (err, db) => {
            connected_db = db;
            done();
        });
    });

    beforeEach((done) => {
        const data = [
            {
              title: 'title',
              genres: 'genres',
              creator: 'creator',
              release: 'release',
              cast: 'cast',
              rate: 8,
              runtime: 100
            },
            {
              title: 'title1',
              genres: 'genres1',
              creator: 'creator1',
              release: 'release1',
              cast: 'cast1',
              rate: 10,
              runtime: 130
            }
        ];

        connected_db.collection(COLLECTION_NAME).insertMany(data, (err, res) => {
            if (1 === res.result.ok) {
                done();
            }

            if (err) {
                console.log(err);
                done();
            }
        })
    });

    afterEach((done) => {
        let state = connected_db.collection(COLLECTION_NAME).toJSON();
        state.documents.length = 0;
        done();
    });

    after(() => {
        connected_db.close();
    });

    it('should create a movie', async () => {
        // given
        const data = {
          title: 'title',
          genres: 'genres',
          creator: 'creator',
          release: 'release',
          cast: 'cast',
          rate: 8,
          runtime: 100
        };

        // when
        const result = await model.Movies(connected_db).add(data).catch(err => console.log(err));

        // then
        expect(result.result).to.have.all.deep.keys({ ok: 1, n: 1 });
        expect(result.insertedCount).to.equal(1);
        expect(result.ops[0].title).to.equal(data.title);
    });

    it('should return two users', async () => {
        // when
        const movies = await model.Movies(connected_db).getAll().catch(err => console.log(err));

        // then
        expect(movies).to.have.lengthOf(2);
    });

    it('should return one movie with specific id', async () => {
        // given
        const data = {
          title: 'title',
          genres: 'genres',
          creator: 'creator',
          release: 'release',
          cast: 'cast',
          rate: 8,
          runtime: 100
        };
        const result = await model.Movies(connected_db).add(data).catch(err => console.log(err));
        const id = result.ops[0]._id;

        // when
        const movie = await model.Movies(connected_db).getById(id).catch(err => console.log(err));

        // then
        expect(movie).to.be.an('object');
        expect(movie.title).to.equal(data.title);
    });

    it('should update movie with specific id', async () => {
        // given
        const data = {
          title: 'title3',
          genres: 'genres3',
          creator: 'creator3',
          release: 'release3',
          cast: 'cast3',
          rate: 8,
          runtime: 100
        };
        const resultAdd = await model.Movies(connected_db).add(data).catch(err => console.log(err));
        const id = resultAdd.ops[0]._id;

        // when
        const result = await model.Movies(connected_db).update(id, data).catch(err => console.log(err));

        // then
        expect(result.result).to.have.all.deep.keys({ ok: 1, nModified: 1, n: 1 });
        expect(result.modifiedCount).to.equal(1);
    });

    it('should delete movie with specific id', async () => {
        // given
        const data = {
          title: 'title3',
          genres: 'genres3',
          creator: 'creator3',
          release: 'release3',
          cast: 'cast3',
          rate: 8,
          runtime: 100
        };
        const resultAdd = await model.Movies(connected_db).add(data).catch(err => console.log(err));
        const id = resultAdd.ops[0]._id;

        // when
        const result = await model.Movies(connected_db).remove(id).catch(err => console.log(err));

        // then
        expect(result.result).to.have.all.deep.keys({ ok: 1, n: 1 });
        expect(result.deletedCount).to.equal(1);
    });
});
