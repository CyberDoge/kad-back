import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    src: `${__dirname}`,
});

import('src/startServer').then(
    (starter) => {
        starter.startServer();
    }
);
