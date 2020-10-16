import React, { useState } from 'react'

const S = {
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
    overflow: 'hidden',
    margin: '10px 0px 20px',
  },
}

export const PostContentsTable = ({ html }) => {
  const [isOpenPanel, setIsOpenPanel] = useState(false)
  const handlePanel = () => {
    setIsOpenPanel(!isOpenPanel)
  }
  return (
    <>
      <div style={S.container} onClick={handlePanel}>
        <div style={S.title}>목차</div>
        <div style={S.button}>{isOpenPanel ? '닫기' : '열기'}</div>
      </div>
      <div
        style={{
          ...S.contents,
          height: isOpenPanel ? 'auto' : '0',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}
