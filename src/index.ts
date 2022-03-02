import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    src: `${__dirname}`,
});

import('./serverStarter').then(
    (starter) => {
        starter.serverStarter();
    }
);
