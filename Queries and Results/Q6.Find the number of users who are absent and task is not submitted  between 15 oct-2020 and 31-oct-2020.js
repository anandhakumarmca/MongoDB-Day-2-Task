db.getCollection('attendance').aggregate(
  [
    {
      $match: {
        date: {
          $gte: '2020-10-15T00:00:00.000Z',
          $lte: '2020-10-31T23:59:59.999Z'
        },
        $or: [
          { status: 'absent' },
          { taskSubmitted: false }
        ]
      }
    },
    {
      $group: {
        _id: {
          userId: '$userId',
          status: {
            $cond: [
              { $eq: ['$status', 'absent'] },
              'absent',
              'taskSubmitted: false'
            ]
          }
        },
        count: { $sum: 1 },
        dates: { $push: '$date' }
      }
    },
    {
      $group: {
        _id: '$_id.userId',
        userData: {
          $push: {
            status: '$_id.status',
            count: '$count',
            dates: '$dates'
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        userData: 1
      }
    },
    {
      $group: {
        _id: null,
        usersData: { $push: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        absentAndTaskNotSubmitted: '$usersData'
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);