ApiConfigs = new Mongo.Collection('ApiConfigs');

ApiConfigs.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Name of this Configuration',
    unique: true
  },
  // name of collection that results should be published into
  collectionName: {
    type: String,
    label: 'Name of Collection',
    optional: true
  },
  //JsonPath expression to locate the array within the API results
  jsonPath: {
    type: String,
    label: 'JSON Path to Returned Array',
    optional: true
  },
  restUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'REST Endpoint URL',
    optional: true
  },
  headers: {
    type: [String],
    optional: true
  },
  restAuth: {
    type: Object,
    blackbox: true,
    optional: true
  },
  "restAuth.secretKey": {
    type: String,
    label: 'Secret Key (optional)',
    optional: true
  },
  userId: {
    type: String,
    regEx: /^[a-z0-9A-z .]{3,30}$/,
    index: true,
    autoform: {
      omit: true
    },
    optional: true
  },
  pollInterval: {
    type: Number,
    label: 'How often to poll the REST API (in seconds)',
    optional: true
  },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    },
    autoform: {
      omit: true
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    autoform: {
      omit: true
    },
    optional: true
  }
}));
