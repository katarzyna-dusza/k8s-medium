module.exports.Movies = (db) => {
    const collectionName = 'movies';

    return {
        getAll: () => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName)
                    .find()
                    .toArray((err, result) => {
                        if (result) {
                            return resolve(result);
                        }

                        return reject(err);
                    });
            });
        },
        getById: (id) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName)
                    .findOne({_id: id}, (err, result) => {
                        if (result) {
                            return resolve(result);
                        }

                        return reject(err);
                    });
            });
        },
        add: (data) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName)
                    .insertOne(data)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            });
        },
        update: (id, data) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName)
                    .updateOne({_id: id},
                        {
                            $set: {
                                title: data.title,
                                genres: data.genres,
                                creator: data.creator,
                                release: data.release,
                                cast: data.cast,
                                rate: data.rate,
                                runtime: data.runtime
                            }
                        }
                    )
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            });
        },
        remove: (id) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName)
                    .deleteOne({_id: id})
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            });
        },
    }
};
