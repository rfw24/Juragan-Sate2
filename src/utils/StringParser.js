export const StringParser = {
    parseEquipDesc(equipData, currentLvl) {
        let val1 = equipData.base + (equipData.step * (currentLvl - 1));
        
        if (equipData.type === 'float') {
            val1 = val1.toFixed(1);
        } else {
            val1 = Math.floor(val1);
        }

        let result = equipData.descTemplate.replace('{val}', val1);

        if (equipData.type === 'complex') {
            let val2 = equipData.base2 + (equipData.step2 * (currentLvl - 1));
            result = result.replace('{val.2}', val2.toFixed(1));
        }

        return result;
    }
};
