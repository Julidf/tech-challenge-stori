import React from 'react'

function button({handleSubmit, disableReason, text}) {


  return (
    <>
      <button type="button" onClick={handleSubmit} className="btn add-recipient-button" disabled={disableReason}>
          {text}
      </button>
    </>
  )
}

export default button