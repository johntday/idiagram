Constants = {};

Constants.ctxDefault =
{
    title: 'Car Diagram'
    , type: 'ctx'
    , style: 'simple'
    , private: false
    , code: '[Car]<>-[Door]'
};
Constants.actDefault =
{
    title: 'Make Tea'
    , type: 'act'
    , style: 'simple'
    , private: false
    , code: '(start)-><a>[kettle empty]->(Fill Kettle)->|b|\n<a>[kettle full]->|b|->(Boil Kettle)->|c|\n|b|->(Add Tea Bag)->(Add Milk)->|c|\n|c|->(Pour Water)->(end)'
}
Constants.seqDefault = {
    title: 'Eve'
    , type: 'seq'
    , style: 'simple'
    , private: false
    , code: 'Snake->Eve: take a bite\nEve-->Snake: ok\nEve->Apple: bite'
};

Constants.adminUsername = 'johntday';
Constants.signupcode = 'photon';
Constants.showSignUpCode = false;
Constants.version = '0.5.4';
