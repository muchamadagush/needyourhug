import React from 'react'

const Input = ({ id, type, name, giveClass, placeholder, label, onChange }) => {
  return (
    <div class={`md-input-main ${giveClass}`}>
      <div class="md-input-box">
        <input
          id={id}
          name={name}
          type={type}
          class="md-input"
          placeholder=""
          onChange={onChange}
        />
        <label for={placeholder} class="md-label">{label}</label>
        <div class="md-input-underline" />
      </div>
    </div>
  )
}

export default Input
