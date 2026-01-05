import React from 'react';

const ResultCard = ({ e85ToAdd, gasToAdd, targetBlend, unit }) => {
    return (
        <div className="card" style={{ marginTop: '24px', borderTop: '4px solid var(--accent-secondary)' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)' }}>Calculation Results</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'var(--input-bg)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Add E85</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)' }}>
                        {Number(e85ToAdd).toFixed(2)} <span style={{ fontSize: '14px', fontWeight: '400' }}>{unit}</span>
                    </div>
                </div>

                <div style={{ background: 'var(--input-bg)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Add Pump Gas</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-secondary)' }}>
                        {Number(gasToAdd).toFixed(2)} <span style={{ fontSize: '14px', fontWeight: '400' }}>{unit}</span>
                    </div>
                </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Resulting Blend</div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>
                    E{targetBlend}
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
