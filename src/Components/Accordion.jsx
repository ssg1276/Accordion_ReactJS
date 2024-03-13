import React, { useState } from 'react'
import data from './data.js'

function Accordion() {
  const [selected, setSelected] = useState(null)
  const [enableMultiple, setEnableMultiple] = useState(false)
  const [multiple, setMultiple] = useState([])

  function handleSingle(info) {
    setSelected(info === selected ? null : info)
  }

  function handleMultiple(info) {
    let cpy = [...multiple]
    const findIndex = cpy.indexOf(info)

    if (findIndex === -1) cpy.push(info)
    else cpy.splice(findIndex, 1)

    setMultiple(cpy)
  }

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-md shadow-md shadow-slate-400">
      <button
        className="bg-yellow-400 px-4 py-2 rounded-md text-black hover:bg-yellow-500 transition-all duration-300"
        onClick={() => {
          setEnableMultiple(!enableMultiple)
        }}
      >
        {enableMultiple ? 'Disable multiple' : 'Enable Multiple'} Accordion
      </button>
      <div className="mt-4">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              key={dataItem.id}
              className="cursor-pointer hover:bg-gray-200 hover:text-gray-800 p-4 rounded-md transition-all duration-300"
              onClick={
                enableMultiple
                  ? () => handleMultiple(dataItem.id)
                  : () => handleSingle(dataItem.id)
              }
            >
              <h2 className="font-black ">{dataItem.question}</h2>
              {(selected === dataItem.id ||
                multiple.indexOf(dataItem.id) !== -1) && (
                <div className="mt-2" key={dataItem.id}>
                  <h2 className="text-black">{dataItem.answer}</h2>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Error: Data not found</div>
        )}
      </div>
    </div>
  )
}

export default Accordion
