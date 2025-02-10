const connection = require('./connection');
const boot = require('./boot');


const { peer } = connection.initClient();

boot.initBoot(peer);