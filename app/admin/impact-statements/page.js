'use client';

import React, { useState } from 'react';
import { IMPACT_STATEMENT_RANGES } from '../../../utils/impactStatementConfig';
import styles from './admin.module.scss';

/**
 * Admin Page for Managing Impact Statements
 * 
 * This is a mockup to demonstrate how impact statements would be managed
 * In production, this would:
 * - Require authentication (admin only)
 * - Connect to a real database
 * - Have full CRUD operations
 * - Include validation and error handling
 * - Have an audit log
 * - Support A/B testing
 */
export default function AdminImpactStatementsPage() {
  const [statements, setStatements] = useState(IMPACT_STATEMENT_RANGES);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (statement) => {
    setEditingId(statement.id);
    setEditForm({ ...statement });
  };

  const handleSave = () => {
    // In production, this would be an API call to update the database
    setStatements(statements.map(s => 
      s.id === editingId ? { ...editForm, updatedAt: new Date().toISOString() } : s
    ));
    setEditingId(null);
    setEditForm({});
    alert('Impact statement updated! (This is a mock - not saved to database)');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleToggleActive = (id) => {
    // In production, this would be an API call
    setStatements(statements.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive, updatedAt: new Date().toISOString() } : s
    ));
  };

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>Impact Statement Management</h1>
        <p className={styles.subtitle}>
          Configure dynamic impact messages based on donation amounts
        </p>
        <div className={styles.warning}>
          ⚠️ <strong>Mock Admin Panel</strong> - Changes are not persisted to a database
        </div>
      </header>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Statements</span>
          <span className={styles.statValue}>{statements.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Active</span>
          <span className={styles.statValue}>
            {statements.filter(s => s.isActive).length}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Inactive</span>
          <span className={styles.statValue}>
            {statements.filter(s => !s.isActive).length}
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount Range</th>
              <th>Impact Statement</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement) => (
              <tr key={statement.id} className={!statement.isActive ? styles.inactive : ''}>
                <td>{statement.id}</td>
                <td className={styles.range}>
                  {editingId === statement.id ? (
                    <div className={styles.rangeInputs}>
                      <input
                        type="number"
                        value={editForm.minAmount}
                        onChange={(e) => setEditForm({ ...editForm, minAmount: parseFloat(e.target.value) })}
                        min="1"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={editForm.maxAmount}
                        onChange={(e) => setEditForm({ ...editForm, maxAmount: parseFloat(e.target.value) })}
                        min="1"
                      />
                    </div>
                  ) : (
                    <span>£{statement.minAmount} - £{statement.maxAmount}</span>
                  )}
                </td>
                <td className={styles.statement}>
                  {editingId === statement.id ? (
                    <textarea
                      value={editForm.statement}
                      onChange={(e) => setEditForm({ ...editForm, statement: e.target.value })}
                      rows={3}
                      className={styles.statementTextarea}
                    />
                  ) : (
                    <span>{statement.statement}</span>
                  )}
                </td>
                <td>
                  <span className={`${styles.badge} ${statement.isActive ? styles.badgeActive : styles.badgeInactive}`}>
                    {statement.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className={styles.date}>
                  {new Date(statement.updatedAt).toLocaleDateString()}
                </td>
                <td className={styles.actions}>
                  {editingId === statement.id ? (
                    <>
                      <button onClick={handleSave} className={styles.btnSave}>
                        Save
                      </button>
                      <button onClick={handleCancel} className={styles.btnCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(statement)} className={styles.btnEdit}>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleToggleActive(statement.id)} 
                        className={statement.isActive ? styles.btnDeactivate : styles.btnActivate}
                      >
                        {statement.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.infoBox}>
        <h3>💡 How This Works</h3>
        <ul>
          <li>Each statement has a min and max amount range</li>
          <li>Use <code>{'{amount}'}</code> placeholder to insert the actual donation amount</li>
          <li>Only active statements are shown to donors</li>
          <li>Statements are fetched dynamically via API</li>
          <li>Changes would be saved to database in production</li>
        </ul>
      </div>

      <div className={styles.infoBox} style={{ marginTop: '20px' }}>
        <h3>🚀 Production Features (Not Yet Implemented)</h3>
        <ul>
          <li><strong>Authentication:</strong> Admin login required</li>
          <li><strong>Database:</strong> PostgreSQL/MySQL with audit logs</li>
          <li><strong>A/B Testing:</strong> Test different statements for same range</li>
          <li><strong>Analytics:</strong> Track which statements perform best</li>
          <li><strong>Validation:</strong> Prevent overlapping ranges</li>
          <li><strong>Preview:</strong> Preview statement before activating</li>
          <li><strong>History:</strong> View change history and rollback</li>
          <li><strong>Multi-language:</strong> Manage statements in multiple languages</li>
        </ul>
      </div>
    </div>
  );
}
