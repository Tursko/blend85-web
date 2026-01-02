import React from 'react';

const InputGroup = ({ label, value, onChange, unit, min = 0, max = 100, step = 1, disabled = false }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <div className="input-wrapper">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || val === '.') {
                            onChange(val);
                            return;
                        }
                        const num = parseFloat(val);
                        if (!isNaN(num) && num >= 0) {
                            onChange(val);
                        }
                    }}
                    placeholder="0"
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                />
                {unit && <span>{unit}</span>}
            </div>
            {/* Optional: Add a slider for better mobile UX if it's a percentage */}
            {unit === '%' && !disabled && (
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value || 0}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        width: '100%',
                        marginTop: '8px',
                        accentColor: 'var(--accent-primary)',
                        cursor: 'pointer'
                    }}
                />
            )}
        </div>
    );
};

export default InputGroup;
