import React from 'react'

export default function Price({currency, price}) {
  return (
    <>
        {currency}
        <span> {Number(price).toLocaleString('my-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </>
  )
}
