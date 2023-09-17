db.getCollection('company_drives').aggregate(
  [
    {
      $match: {
        driveDate: {
          $gte: '2020-10-15T00:00:00.000Z',
          $lte: '2020-10-31T23:59:59.999Z'
        }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);