


var users = {
    _id: '',
    username: '',
    emails: [],
    createdAt:'',
    profile: {
        name: '',
        projectIds: [],
        lastModified: [{
            _id: '',
            title: '',
            username: '',
            modifiedAt: ''//greater of createdAt / updatedAt
        }],
        lastViewed: [{
            _id: '',
            title: '',
            username: '',
            modifiedAt: ''//greater of createdAt / updatedAt
        }]
    }
};
