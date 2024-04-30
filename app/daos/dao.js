const daoCommon = require('./common/daoCommon')

/**
 * 
 * daoCommon = { findAll(), findById(), countAll() }
 *  findAll(), findById(), countAll()
 * 
 * artistDao = { table, getInfo(), create(), update(), sort()}
 *  table, getInfo(), create(), update(), sort()
 * 
 * artistDao= {findAll(), findById(), countAll(), table, getInfo(),...}
 */

const artistDao = { ...daoCommon, ...require('./api/artistDao') }

const bandDao = { ...daoCommon, ...require('./api/bandDao') }

const albumDao = { ...daoCommon, ...require('./api/albumDao') }

module.exports = { artistDao, bandDao, albumDao }