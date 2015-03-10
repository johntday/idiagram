AppProperties = {
    SequenceDiagram: {
        updateTimeMilliSeconds: 5000
    },
    admin: 'johntday',
    signupcode: 'photon',
    showSignUpCode: false,
    enableEastPanel: false,
    version: '0.1.2',

    diagrams: {
        filters:{
            isStar: false,
            text: '',
            private: 'privateAndPublic',
            hideOtherPublic: true
        },
        sort: {
            sortBy: 'title',
            sortDir: 1
        }
    }
};

diagramCnts = new ReactiveDict();
diagramCnts.set('all',0);
diagramCnts.set('private', 0);
diagramCnts.set('public', 0);
diagramCnts.set('starred', 0);
