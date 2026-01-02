export function calculateBlend(
    tankSize,
    currentTankLevel,
    currentBlend,
    targetBlend,
    e85Eth,
    gasEth
) {
    // Convert percentages to decimals
    const tankSizeVal = parseFloat(tankSize);
    const currentTankLevelDec = parseFloat(currentTankLevel) / 100;
    const currentBlendDec = parseFloat(currentBlend) / 100;
    const targetBlendDec = parseFloat(targetBlend) / 100;
    const e85EthDec = parseFloat(e85Eth) / 100;
    const gasEthDec = parseFloat(gasEth) / 100;

    if (isNaN(tankSizeVal) || isNaN(currentTankLevelDec) || isNaN(currentBlendDec) || isNaN(targetBlendDec) || isNaN(e85EthDec) || isNaN(gasEthDec)) {
        return { e85ToAdd: 0, gasToAdd: 0, targetBlend: 0 };
    }

    const currentFuel = tankSizeVal * currentTankLevelDec;
    const currentE85 = currentFuel * currentBlendDec;
    const targetE85 = tankSizeVal * targetBlendDec;
    const availableSpace = tankSizeVal - currentFuel;

    let e85ToAdd =
        (currentE85 + availableSpace * gasEthDec - targetE85) /
        (gasEthDec - e85EthDec);

    if (e85ToAdd <= 0 || isNaN(e85ToAdd)) {
        e85ToAdd = 0.0;
    }

    if (availableSpace > 0) {
        if (e85ToAdd > availableSpace) {
            e85ToAdd = availableSpace;
        }
    } else {
        e85ToAdd = 0.0;
    }

    let gasToAdd = availableSpace - e85ToAdd;

    if (gasToAdd <= 0 || isNaN(gasToAdd)) {
        gasToAdd = 0.0;
    }

    const finalTotalFuel = currentFuel + e85ToAdd + gasToAdd;
    const finalTotalEth = currentE85 + (e85ToAdd * e85EthDec) + (gasToAdd * gasEthDec);

    // If we didn't add anything, the blend is just the current blend
    let finalBlend = 0;
    if (finalTotalFuel > 0) {
        finalBlend = (finalTotalEth / finalTotalFuel) * 100;
    } else {
        finalBlend = 0;
    }

    return {
        e85ToAdd: parseFloat(e85ToAdd.toFixed(2)),
        gasToAdd: parseFloat(gasToAdd.toFixed(2)),
        targetBlend: parseFloat(finalBlend.toFixed(1)),
    };
}
