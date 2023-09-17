db.getCollection('codekata').aggregate(
  [
    { $unwind: '$solvedUsers' },
    {
      $group: {
        _id: '$solvedUsers.userId',
        solvedProblems: { $push: '$$ROOT' }
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { _id: '$_id' },
            {
              solvedProblems: {
                $size: '$solvedProblems'
              }
            }
          ]
        }
      }
    },
    { $sort: { _id: 1 } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);