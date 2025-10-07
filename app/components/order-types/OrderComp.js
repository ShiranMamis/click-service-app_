import React from 'react'
import InputBoxFileComp from './InputBoxFileComp'

export default function OrderComp(props) {
    return (
        <div className='bg-[rgb(255,255,255)] w-full rounded-2xl shadow-sm p-2 '>
            <div className='items-center mb-4 mt-3'>
                <p className='font-bold text-[20px] items-center flex justify-center'>{props.bookingType.display_name}</p>
                <p className='text-[#868686] flex justify-center'>מלא את הפרטים הבאים בהתאם</p>
            </div>
            <div >
                <InputBoxFileComp
                    isOptions={props.isOptions}
                    onClose={props.onClose}
                    onSelect={props.onSelect}
                    onItemsChange={props.onItemsChange}
                    selectedItem={props.selectedItem}
                    items={props.items}
                    selectedOption={props.selectedOption}
                    fields={props.fields}
                    statement={props.statement}
                />
            </div>
        </div>
    )
}
