export interface Document {
    id: number, title: string,
    brief: string, doc: string, files: any[]
}

export interface DocumentBrief {
    id: number, title: string,
    brief: string,
}

export const getDocStatistics = async (): Promise<{ amount: number, title: string }[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        { 'amount': 4, 'title': 'Notices' },
        { 'amount': 78, 'title': 'Use Cases' },
        { 'amount': 13, 'title': 'Historical Notices' },
    ]
}

export const getHistoricalNotices = async (): Promise<Document[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        {
            'id': 3,
            'title': 'v1.1.0 Bugfixes release',
            'brief': 'Please have one look on the bug fixes releases.',
            'doc': '',
            'files': [''],
        },
        {
            'id': 4,
            'title': 'v1.1.1 New Feature release',
            'brief': 'Please have one look on the new features!',
            'doc': '',
            'files': [''],
        },
        {
            'id': 5,
            'title': 'v1.0.0 Bugfixes release',
            'brief': 'Please have one look on the bug fixes releases.',
            'doc': '',
            'files': [''],
        },
    ]
}

export const getNotices = async (): Promise<Document[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [{
        'id': 1,
        'title': 'v1.2.1 Bugfixes release',
        'brief': 'Please have one look on the bug fixes releases.',
        'doc': '',
        'files': [''],
    }, {
        'id': 2,
        'title': 'v1.2.1 New Feature release',
        'brief': 'Please have one look on the new features!',
        'doc': '',
        'files': [''],
    }]
}

export const getUseCases = async (): Promise<Document[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [{
        'id': 1,
        'title': 'Guide one',
        'brief': 'Guide one  Guide one Guide one ',
        'doc': '',
        'files': [''],
    }, {
        'id': 2,
        'title': 'Guide two',
        'brief': 'Guide two Guide two Guide two ',
        'doc': '',
        'files': [''],
    }, {
        'id': 3,
        'title': 'Guide three',
        'brief': 'Guide two Guide two Guide two ',
        'doc': '',
        'files': [''],
    }, {
        'id': 4,
        'title': 'Guide four',
        'brief': 'Guide two Guide two Guide two ',
        'doc': '',
        'files': [''],
    }, {
        'id': 5,
        'title': 'Guide five',
        'brief': 'Guide two Guide two Guide two ',
        'doc': '',
        'files': [''],
    }]
}