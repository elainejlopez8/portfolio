'use client';

import { useDocumentInfo, useForm, useFormModified, useOperation } from '@payloadcms/ui';
import React from 'react';

export function SaveButton() {
  const { submit } = useForm();
  const modified = useFormModified();
  const { uploadStatus } = useDocumentInfo();
  const operation = useOperation();

  const [saving, setSaving] = React.useState(false);

  const disabled = (operation === 'update' && !modified) || uploadStatus === 'uploading' || saving;

  async function handleSave() {
    if (disabled) return;
    setSaving(true);
    try {
      await submit();
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      className='save-btn-custom'
      disabled={disabled}
      onClick={handleSave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.5rem 1.25rem',
        fontSize: '0.875rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        letterSpacing: '0.04em',
        borderRadius: '6px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background 150ms ease, opacity 150ms ease',
        background: saving ? 'rgb(83 65 120)' : 'linear-gradient(135deg, rgb(95 75 135), rgb(160 95 145))',
        color: '#fff',
        boxShadow: disabled ? 'none' : '0 2px 8px rgba(95,75,135,0.35)',
        whiteSpace: 'nowrap',
      }}
      type='button'>
      {saving ? (
        <>
          <SaveSpinner />
          Saving…
        </>
      ) : (
        <>
          <SaveIcon />
          Save
        </>
      )}
    </button>
  );
}

function SaveIcon() {
  return (
    <svg
      fill='none'
      height='14'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      style={{ flexShrink: 0 }}
      viewBox='0 0 24 24'
      width='14'>
      <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' />
      <polyline points='17 21 17 13 7 13 7 21' />
      <polyline points='7 3 7 8 15 8' />
    </svg>
  );
}

function SaveSpinner() {
  return (
    <svg
      height='14'
      style={{ flexShrink: 0, animation: 'cms-spin 0.7s linear infinite' }}
      viewBox='0 0 24 24'
      width='14'>
      <style>{`@keyframes cms-spin { to { transform: rotate(360deg); } }`}</style>
      <circle
        cx='12'
        cy='12'
        fill='none'
        r='10'
        stroke='currentColor'
        strokeDasharray='31.4'
        strokeDashoffset='10'
        strokeLinecap='round'
        strokeWidth='2.5'
      />
    </svg>
  );
}
