db.getCollection('mentors').aggregate(
  [
    {
      $project: {
        _id: 0,
        mentorId: 1,
        username: 1,
        email: 1,
        menteeCount: {
          $size: '$assignedMentees.userId'
        }
      }
    },
    { $match: { menteeCount: { $gt: 15 } } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);