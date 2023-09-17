db.getCollection('topics').aggregate(
  [
    {
      $match: {
        $expr: {
          $eq: [{ $month: '$topicDate' }, 10]
        }
      }
    },
    {
      $lookup: {
        from: 'tasks',
        let: { topicDate: '$topicDate' },
        pipeline: [
          {
            $addFields: {
              taskMonth: { $month: '$dueDate' },
              taskDay: { $dayOfMonth: '$dueDate' }
            }
          },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$taskMonth', 10] },
                  {
                    $eq: [
                      '$taskDay',
                      {
                        $dayOfMonth: '$$topicDate'
                      }
                    ]
                  }
                ]
              }
            }
          },
          {
            $project: {
              _id: 0,
              taskId: 1,
              taskName: 1,
              dueDate: 1
            }
          }
        ],
        as: 'tasks'
      }
    },
    {
      $project: {
        _id: 0,
        topicId: 1,
        topicName: 1,
        topicDate: 1,
        tasks: 1
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);