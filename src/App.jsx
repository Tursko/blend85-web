import React, { useState, useEffect } from 'react';
import InputGroup from './components/InputGroup';
import ResultCard from './components/ResultCard';
import { calculateBlend } from './utils/calculateBlend';

import cars from './data/cars.json';

const LITERS_PER_GALLON = 3.78541;

function App() {
  const [selectedCar, setSelectedCar] = useState('');
  const [tankSize, setTankSize] = useState('');
  const [unit, setUnit] = useState('gal'); // 'gal' or 'L'
  const [currentTankLevel, setCurrentTankLevel] = useState('');
  const [currentBlend, setCurrentBlend] = useState('');
  const [targetBlend, setTargetBlend] = useState('');
  const [e85Eth, setE85Eth] = useState(85);
  const [gasEth, setGasEth] = useState(10);

  const [result, setResult] = useState({ e85ToAdd: 0, gasToAdd: 0, targetBlend: 0 });

  useEffect(() => {
    const res = calculateBlend(
      tankSize,
      currentTankLevel,
      currentBlend,
      targetBlend,
      e85Eth,
      gasEth
    );
    setResult(res);
  }, [tankSize, currentTankLevel, currentBlend, targetBlend, e85Eth, gasEth]);

  const handleCarChange = (e) => {
    const carId = e.target.value;
    setSelectedCar(carId);
    if (carId) {
      const car = cars.find(c => c.id === carId);
      if (car) {
        let size = car.tankSize;
        if (unit === 'L' && car.unit === 'gal') {
          size = (size * LITERS_PER_GALLON).toFixed(1);
        } else if (unit === 'gal' && car.unit === 'L') {
          // Future proofing in case cars.json has Liters
          size = (size / LITERS_PER_GALLON).toFixed(1);
        }
        setTankSize(size);
      }
    } else {
      setTankSize('');
    }
  };

  const handleUnitChange = (newUnit) => {
    if (newUnit === unit) return;

    setUnit(newUnit);

    // Convert tank size if it exists
    if (tankSize) {
      if (newUnit === 'L' && unit === 'gal') {
        setTankSize((parseFloat(tankSize) * LITERS_PER_GALLON).toFixed(1));
      } else if (newUnit === 'gal' && unit === 'L') {
        setTankSize((parseFloat(tankSize) / LITERS_PER_GALLON).toFixed(1));
      }
    }
  };

  return (
    <>
      <h1>blend85 🌽</h1>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
          <div className="segmented-control">
            <button
              className={unit === 'gal' ? 'active' : ''}
              onClick={() => handleUnitChange('gal')}
            >
              Gallons
            </button>
            <button
              className={unit === 'L' ? 'active' : ''}
              onClick={() => handleUnitChange('L')}
            >
              Liters
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Select Car (Optional)</label>
          <div className="input-wrapper">
            <select
              value={selectedCar}
              onChange={handleCarChange}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '16px',
                padding: '12px 0',
                width: '100%',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="" style={{ color: 'black' }}>Custom Tank Size</option>
              {cars.map(car => (
                <option key={car.id} value={car.id} style={{ color: 'black' }}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <InputGroup
          label="Gas Tank Size"
          value={tankSize}
          onChange={setTankSize}
          unit={unit}
          max={unit === 'gal' ? 30 : 100}
          disabled={!!selectedCar}
        />

        <InputGroup
          label="Current Tank Level"
          value={currentTankLevel}
          onChange={setCurrentTankLevel}
          unit="%"
          max={100}
        />

        <InputGroup
          label="Current Ethanol Blend"
          value={currentBlend}
          onChange={setCurrentBlend}
          unit="%"
          max={100}
        />

        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <InputGroup
            label="Target Ethanol Blend"
            value={targetBlend}
            onChange={setTargetBlend}
            unit="%"
            max={100}
          />
          <InputGroup
            label="E85 Ethanol Content"
            value={e85Eth}
            onChange={setE85Eth}
            unit="%"
            max={100}
          />
          <InputGroup
            label="Pump Gas Ethanol Content"
            value={gasEth}
            onChange={setGasEth}
            unit="%"
            max={100}
          />
        </div>
      </div>

      <ResultCard
        e85ToAdd={result.e85ToAdd}
        gasToAdd={result.gasToAdd}
        targetBlend={result.targetBlend}
        unit={unit}
      />
    </>
  );
}

export default App;
