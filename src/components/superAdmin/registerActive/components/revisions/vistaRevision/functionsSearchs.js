require("babel-core/register");
require("babel-polyfill");


//Empesamos el apartado de la promesas

const forBuildings = async (asset, id) => {
    let active = ''
    for (const building of asset.checkList.buildings) {
        if (building.idQR === id) {
            active = building

            break;
        } else {
            active = await forLevels(building, id)

            if (active != '') {
                break;
            }
        }
    }

    return active
}

const forLevels = async (building, id) => {
    let active = ''

    for (const level of building.levels) {
        if (level.idQR === id) {
            active = level;
            break;
        } else {
            active = await forAreas(level, id)

            if (active != '') {
                break;
            } else {
                active = await forRealAssets(level, id)
            }

            if (active != '') {
                break;
            }
        }

    }

    return active
}

const forAreas = async (level, id) => {
    let active = ''

    for (const area of level.areas) {
        if (area.idQR === id) {
            active = area;
            break;
        } else {
            active = await forAssets(area, id)

            if (active != '') {
                break;
            }
        }

    }

    return active
}

const forRealAssets = async (level, id) => {

    let active = ''

    for (const real of level.RealEstateAssets) {
        if (real.idQR === id) {
            active = real;
            break;
        }

    }

    return active

}

const forAssets = async (area, id) => {

    let active = ''

    for (const asset of area.assets) {
        if (asset.idQR === id) {
            active = asset;
            break;
        }

    }

    return active

}

export default forBuildings;