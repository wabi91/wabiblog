import React, { useState } from 'react'

const S = {
  root: {
    position: 'sticky',
    top: 0,
    background: '#fff',
    zIndex: 2,
  },
  container: {
    display: 'flex',
    cursor: 'pointer',
    borderBottom: '1px solid hsla(0,0%,0%,0.07)',
  },
  title: {
    flex: 1,
    fontSize: '1.51572rem',
    fontWeight: 'bold',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
  },
  contents: {
    padding: '10px 0px 20px',
  },
}

export const PostContentsTable = ({ html }) => {
  const [isOpenPanel, setIsOpenPanel] = useState(false)
  const handlePanel = () => {
    setIsOpenPanel(!isOpenPanel)
  }
  return (
    <div style={S.root}>
      <div style={S.container} onClick={handlePanel}>
        <div style={S.title}>목차</div>
        <div style={S.button}>{isOpenPanel ? '닫기' : '열기'}</div>
      </div>
      <div
        style={{
          ...S.contents,
          display: isOpenPanel ? 'block' : 'none',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
