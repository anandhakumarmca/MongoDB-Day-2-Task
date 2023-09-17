db.getCollection('company_drives').aggregate(
  [
    {
      $lookup: {
        from: 'users',
        localField: 'usersAppeared.userId',
        foreignField: 'userId',
        as: 'students'
      }
    },
    {
      $project: {
        _id: 0,
        'Drive Name': '$driveName',
        'Drive Date': '$driveDate',
        'Students Appeared': '$students.username'
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);