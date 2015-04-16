Constants = {};

Constants.ctxDefault =
{
    title: 'My Title'
    , type: 'ctx'
    , style: 'simple'
    , private: false
    , code: "node0->node1\nnode1 <->node2\nnode3-> node0\nnode3->node2"
};
Constants.seqDefault = {
    title: 'Eve'
    , style: 'simple'
    , code: 'Snake->Eve: take a bite\nEve-->Snake: ok\nEve->Apple: bite'
    , private: false
    , type: 'seq'
};

Constants.adminUsername = 'johntday';
Constants.signupcode = 'photon';
Constants.showSignUpCode = false;
Constants.version = '0.3.1';

Constants.test = {
    "nodes": [{
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35225"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35225/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35225/databases"}],
        "identifier": 35225,
        "description": "The process in which a signal is secreted or discharged into the extracellular medium from a cellular source.",
        "isObsolete": true,
        "name": "signal release",
        "databaseSpecificId": "GO:0023061",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0023061"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15118"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15118/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15118/databases"}],
        "identifier": 15118,
        "description": "The controlled release of a substance by a cell.",
        "isObsolete": true,
        "name": "secretion by cell",
        "databaseSpecificId": "GO:0032940",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0032940"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1228"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1228/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1228/databases"}],
        "identifier": 1228,
        "description": "The cellular process that creates a physical entity or change in state, i.e. a signal, that originates in one cell and is used to transfer information to another cell. This process begins with the initial formation of the signal and ends with the mature form and placement of the signal.",
        "isObsolete": true,
        "name": "generation of a signal involved in cell-cell signaling",
        "databaseSpecificId": "GO:0003001",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0003001"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25556"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25556/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25556/databases"}],
        "identifier": 25556,
        "description": "Any process that is carried out at the cellular level, occurring within a single organism.",
        "isObsolete": true,
        "name": "single-organism cellular process",
        "databaseSpecificId": "GO:0044763",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044763"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8041"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8041/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8041/databases"}],
        "identifier": 8041,
        "description": "The directed movement of a substance or cellular entity, such as a protein complex or organelle, to a specific location within, or in the membrane of, a cell.",
        "isObsolete": true,
        "name": "establishment of localization in cell",
        "databaseSpecificId": "GO:0051649",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051649"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35264"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35264/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35264/databases"}],
        "identifier": 35264,
        "description": "The controlled release of a substance by a cell or a tissue.",
        "isObsolete": true,
        "name": "secretion",
        "databaseSpecificId": "GO:0046903",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0046903"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17733"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17733/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17733/databases"}],
        "identifier": 17733,
        "description": "Any process that mediates the transfer of information from one cell to another.",
        "isObsolete": true,
        "name": "cell-cell signaling",
        "databaseSpecificId": "GO:0007267",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0007267"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/2348"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/2348/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/2348/databases"}],
        "identifier": 2348,
        "description": "Any process that is carried out at the cellular level, but not necessarily restricted to a single cell. For example, cell communication occurs among more than one cell, but occurs at the cellular level.",
        "isObsolete": true,
        "name": "cellular process",
        "databaseSpecificId": "GO:0009987",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0009987"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25499"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25499/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25499/databases"}],
        "identifier": 25499,
        "description": "A biological process that involves only one organism.",
        "isObsolete": true,
        "name": "single-organism process",
        "databaseSpecificId": "GO:0044699",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044699"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27496"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27496/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27496/databases"}],
        "identifier": 27496,
        "description": "The directed movement of a cell, substance or cellular entity, such as a protein complex or organelle, to a specific location.",
        "isObsolete": true,
        "name": "establishment of localization",
        "databaseSpecificId": "GO:0051234",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051234"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8040"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8040/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8040/databases"}],
        "identifier": 8040,
        "description": "A localization process that takes place at the cellular level; as a result of a cellular localization process, a substance or cellular entity, such as a protein complex or organelle, is transported to, and/or maintained in, a specific location within or in the membrane of a cell.",
        "isObsolete": true,
        "name": "cellular localization",
        "databaseSpecificId": "GO:0051641",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051641"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/6947"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/6947/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/6947/databases"}],
        "identifier": 6947,
        "description": "The directed movement of substances (such as macromolecules, small molecules, ions) into, out of or within a cell, or between cells, or within a multicellular organism by means of some agent such as a transporter or pore, involving a single organism.",
        "isObsolete": true,
        "name": "single-organism transport",
        "databaseSpecificId": "GO:0044765",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044765"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1813"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1813/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1813/databases"}],
        "identifier": 1813,
        "description": "Any process that mediates interactions between a cell and its surroundings. Encompasses interactions such as signaling or attachment between one cell and another cell, between a cell and an extracellular matrix, or between a cell and any other aspect of its environment.",
        "isObsolete": true,
        "name": "cell communication",
        "databaseSpecificId": "GO:0007154",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0007154"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25500"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25500/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25500/databases"}],
        "identifier": 25500,
        "description": "A signaling process occurring within a single organism.",
        "isObsolete": true,
        "name": "single organism signaling",
        "databaseSpecificId": "GO:0044700",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044700"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1988"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1988/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1988/databases"}],
        "identifier": 1988,
        "description": "Any process specifically pertinent to the functioning of integrated living units: cells, tissues, organs, and organisms. A process is a collection of molecular events with a defined beginning and end.",
        "isObsolete": true,
        "name": "biological process",
        "databaseSpecificId": "GO:0008150",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0008150"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27470"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27470/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27470/databases"}],
        "identifier": 27470,
        "description": "Any process in which a cell, a substance, or a cellular entity, such as a protein complex or organelle, is transported to, and/or maintained in a specific location.",
        "isObsolete": true,
        "name": "localization",
        "databaseSpecificId": "GO:0051179",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051179"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17520"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17520/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17520/databases"}],
        "identifier": 17520,
        "description": "The directed movement of substances (such as macromolecules, small molecules, ions) into, out of or within a cell, or between cells, or within a multicellular organism by means of some agent such as a transporter or pore.",
        "isObsolete": true,
        "name": "transport",
        "databaseSpecificId": "GO:0006810",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0006810"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15365"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15365/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15365/databases"}],
        "identifier": 15365,
        "description": "The entirety of a process in which information is transmitted within a biological system. This process begins with an active signal and ends when a cellular response has been triggered.",
        "isObsolete": true,
        "name": "signaling",
        "databaseSpecificId": "GO:0023052",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0023052"
    }],
    "relationships": [{"source": 35225, "target": 15118, "rel": "is_a"}, {"source": 35225, "target": 1228, "rel": "part_of"}, {"source": 15118, "target": 25556, "rel": "is_a"}, {
        "source": 15118,
        "target": 8041,
        "rel": "is_a"
    }, {"source": 15118, "target": 35264, "rel": "is_a"}, {"source": 1228, "target": 25556, "rel": "is_a"}, {"source": 1228, "target": 17733, "rel": "part_of"}, {
        "source": 25556,
        "target": 2348,
        "rel": "is_a"
    }, {"source": 25556, "target": 25499, "rel": "is_a"}, {"source": 8041, "target": 27496, "rel": "is_a"}, {"source": 8041, "target": 8040, "rel": "part_of"}, {
        "source": 35264,
        "target": 6947,
        "rel": "is_a"
    }, {"source": 17733, "target": 1813, "rel": "is_a"}, {"source": 17733, "target": 25500, "rel": "is_a"}, {"source": 2348, "target": 1988, "rel": "is_a"}, {
        "source": 25499,
        "target": 1988,
        "rel": "is_a"
    }, {"source": 27496, "target": 1988, "rel": "is_a"}, {"source": 27496, "target": 27470, "rel": "part_of"}, {"source": 8040, "target": 25556, "rel": "is_a"}, {
        "source": 8040,
        "target": 27470,
        "rel": "is_a"
    }, {"source": 6947, "target": 17520, "rel": "is_a"}, {"source": 6947, "target": 25499, "rel": "is_a"}, {"source": 1813, "target": 25556, "rel": "is_a"}, {
        "source": 25500,
        "target": 15365,
        "rel": "is_a"
    }, {"source": 25500, "target": 25499, "rel": "is_a"}, {"source": 27470, "target": 1988, "rel": "is_a"}, {"source": 17520, "target": 27496, "rel": "is_a"}, {"source": 15365, "target": 1988, "rel": "is_a"}],
    "relationshipTypes": [{"code": "is_a", "displayName": "Is a"}, {"code": "regulates", "displayName": "Regulates"}, {"code": "negatively_regulates", "displayName": "Negatively regulates"}, {
        "code": "part_of",
        "displayName": "Part of"
    }, {"code": "positively_regulates", "displayName": "Postively regulates"}]
};

Constants.xxx = {
    "nodes": [{
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35225"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35225/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35225/databases"}],
        "identifier": 35225,
        "description": "The process in which a signal is secreted or discharged into the extracellular medium from a cellular source.",
        "isObsolete": true,
        "name": "signal release",
        "databaseSpecificId": "GO:0023061",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0023061"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15118"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15118/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15118/databases"}],
        "identifier": 15118,
        "description": "The controlled release of a substance by a cell.",
        "isObsolete": true,
        "name": "secretion by cell",
        "databaseSpecificId": "GO:0032940",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0032940"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1228"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1228/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1228/databases"}],
        "identifier": 1228,
        "description": "The cellular process that creates a physical entity or change in state, i.e. a signal, that originates in one cell and is used to transfer information to another cell. This process begins with the initial formation of the signal and ends with the mature form and placement of the signal.",
        "isObsolete": true,
        "name": "generation of a signal involved in cell-cell signaling",
        "databaseSpecificId": "GO:0003001",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0003001"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25556"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25556/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25556/databases"}],
        "identifier": 25556,
        "description": "Any process that is carried out at the cellular level, occurring within a single organism.",
        "isObsolete": true,
        "name": "single-organism cellular process",
        "databaseSpecificId": "GO:0044763",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044763"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8041"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8041/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8041/databases"}],
        "identifier": 8041,
        "description": "The directed movement of a substance or cellular entity, such as a protein complex or organelle, to a specific location within, or in the membrane of, a cell.",
        "isObsolete": true,
        "name": "establishment of localization in cell",
        "databaseSpecificId": "GO:0051649",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051649"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35264"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35264/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/35264/databases"}],
        "identifier": 35264,
        "description": "The controlled release of a substance by a cell or a tissue.",
        "isObsolete": true,
        "name": "secretion",
        "databaseSpecificId": "GO:0046903",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0046903"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17733"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17733/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17733/databases"}],
        "identifier": 17733,
        "description": "Any process that mediates the transfer of information from one cell to another.",
        "isObsolete": true,
        "name": "cell-cell signaling",
        "databaseSpecificId": "GO:0007267",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0007267"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/2348"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/2348/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/2348/databases"}],
        "identifier": 2348,
        "description": "Any process that is carried out at the cellular level, but not necessarily restricted to a single cell. For example, cell communication occurs among more than one cell, but occurs at the cellular level.",
        "isObsolete": true,
        "name": "cellular process",
        "databaseSpecificId": "GO:0009987",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0009987"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25499"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25499/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25499/databases"}],
        "identifier": 25499,
        "description": "A biological process that involves only one organism.",
        "isObsolete": true,
        "name": "single-organism process",
        "databaseSpecificId": "GO:0044699",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044699"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27496"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27496/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27496/databases"}],
        "identifier": 27496,
        "description": "The directed movement of a cell, substance or cellular entity, such as a protein complex or organelle, to a specific location.",
        "isObsolete": true,
        "name": "establishment of localization",
        "databaseSpecificId": "GO:0051234",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051234"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8040"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8040/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/8040/databases"}],
        "identifier": 8040,
        "description": "A localization process that takes place at the cellular level; as a result of a cellular localization process, a substance or cellular entity, such as a protein complex or organelle, is transported to, and/or maintained in, a specific location within or in the membrane of a cell.",
        "isObsolete": true,
        "name": "cellular localization",
        "databaseSpecificId": "GO:0051641",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051641"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/6947"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/6947/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/6947/databases"}],
        "identifier": 6947,
        "description": "The directed movement of substances (such as macromolecules, small molecules, ions) into, out of or within a cell, or between cells, or within a multicellular organism by means of some agent such as a transporter or pore, involving a single organism.",
        "isObsolete": true,
        "name": "single-organism transport",
        "databaseSpecificId": "GO:0044765",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044765"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1813"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1813/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1813/databases"}],
        "identifier": 1813,
        "description": "Any process that mediates interactions between a cell and its surroundings. Encompasses interactions such as signaling or attachment between one cell and another cell, between a cell and an extracellular matrix, or between a cell and any other aspect of its environment.",
        "isObsolete": true,
        "name": "cell communication",
        "databaseSpecificId": "GO:0007154",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0007154"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25500"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25500/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/25500/databases"}],
        "identifier": 25500,
        "description": "A signaling process occurring within a single organism.",
        "isObsolete": true,
        "name": "single organism signaling",
        "databaseSpecificId": "GO:0044700",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0044700"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1988"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1988/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/1988/databases"}],
        "identifier": 1988,
        "description": "Any process specifically pertinent to the functioning of integrated living units: cells, tissues, organs, and organisms. A process is a collection of molecular events with a defined beginning and end.",
        "isObsolete": true,
        "name": "biological process",
        "databaseSpecificId": "GO:0008150",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0008150"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27470"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27470/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/27470/databases"}],
        "identifier": 27470,
        "description": "Any process in which a cell, a substance, or a cellular entity, such as a protein complex or organelle, is transported to, and/or maintained in a specific location.",
        "isObsolete": true,
        "name": "localization",
        "databaseSpecificId": "GO:0051179",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0051179"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17520"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17520/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/17520/databases"}],
        "identifier": 17520,
        "description": "The directed movement of substances (such as macromolecules, small molecules, ions) into, out of or within a cell, or between cells, or within a multicellular organism by means of some agent such as a transporter or pore.",
        "isObsolete": true,
        "name": "transport",
        "databaseSpecificId": "GO:0006810",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0006810"
    }, {
        "links": [{"rel": "self", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15365"}, {
            "rel": "references",
            "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15365/references"
        }, {"rel": "databases", "href": "http://webappdevel.advaitacorporation.net:8080/ars_oauth/go_terms/15365/databases"}],
        "identifier": 15365,
        "description": "The entirety of a process in which information is transmitted within a biological system. This process begins with an active signal and ends when a cellular response has been triggered.",
        "isObsolete": true,
        "name": "signaling",
        "databaseSpecificId": "GO:0023052",
        "rootOntology": "BP",
        "link": "http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=GO:0023052"
    }],
    "relationships": [{"source": 35225, "target": 15118, "rel": "is_a"}, {"source": 35225, "target": 1228, "rel": "part_of"}, {"source": 15118, "target": 25556, "rel": "is_a"}, {
        "source": 15118,
        "target": 8041,
        "rel": "is_a"
    }, {"source": 15118, "target": 35264, "rel": "is_a"}, {"source": 1228, "target": 25556, "rel": "is_a"}, {"source": 1228, "target": 17733, "rel": "part_of"}, {
        "source": 25556,
        "target": 2348,
        "rel": "is_a"
    }, {"source": 25556, "target": 25499, "rel": "is_a"}, {"source": 8041, "target": 27496, "rel": "is_a"}, {"source": 8041, "target": 8040, "rel": "part_of"}, {
        "source": 35264,
        "target": 6947,
        "rel": "is_a"
    }, {"source": 17733, "target": 1813, "rel": "is_a"}, {"source": 17733, "target": 25500, "rel": "is_a"}, {"source": 2348, "target": 1988, "rel": "is_a"}, {
        "source": 25499,
        "target": 1988,
        "rel": "is_a"
    }, {"source": 27496, "target": 1988, "rel": "is_a"}, {"source": 27496, "target": 27470, "rel": "part_of"}, {"source": 8040, "target": 25556, "rel": "is_a"}, {
        "source": 8040,
        "target": 27470,
        "rel": "is_a"
    }, {"source": 6947, "target": 17520, "rel": "is_a"}, {"source": 6947, "target": 25499, "rel": "is_a"}, {"source": 1813, "target": 25556, "rel": "is_a"}, {
        "source": 25500,
        "target": 15365,
        "rel": "is_a"
    }, {"source": 25500, "target": 25499, "rel": "is_a"}, {"source": 27470, "target": 1988, "rel": "is_a"}, {"source": 17520, "target": 27496, "rel": "is_a"}, {"source": 15365, "target": 1988, "rel": "is_a"}],
    "relationshipTypes": [{"code": "is_a", "displayName": "Is a"}, {"code": "regulates", "displayName": "Regulates"}, {"code": "negatively_regulates", "displayName": "Negatively regulates"}, {
        "code": "part_of",
        "displayName": "Part of"
    }, {"code": "positively_regulates", "displayName": "Postively regulates"}]
};
