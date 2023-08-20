import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import styled from '@emotion/styled'
import { Controller } from 'react-hook-form'
export default function SelectLabels({
    options = [],
    onChange,
    value = '',
    borderRadius = '10px',
    background = 'rgba(239, 239, 239, 0.40)',
    fontSize = '16px',
    border = 'none',
    padding,
    width = '100%',
    height,
    color,
    fullWidth,
    colorMenuItem,
    label,
    name,
    control,
    defaultValue = '',
    rules,
    placeholder,
    ...props
}) {
    const StyledSelect = styled(Select)`
    border-radius: 6px;
    width: ${width};
    .MuiOutlinedInput-input {
      border-radius: ${borderRadius};
      border: ${border};
      background: ${background};
      padding: ${padding || '0.5rem 1rem'};
      color: ${color};
      width: ${width};
      height: ${height};
      box-sizing: border-box;
    }
  `
    const StyledMenuItem = styled(MenuItem)`
    color: ${color};
    font-size: ${fontSize};
    padding: ${padding};
  `

    return control ? (
        <Controller
            rules={rules}
            name={name ?? ''}
            control={control}
            defaultValue={defaultValue ?? ''}
            render={({ field }) => {
                return (
                    <StyledSelect
                        displayEmpty
                        fullWidth={fullWidth}
                        {...field}
                        value={field?.value || ''}
                    >
                        <StyledMenuItem selected={true} value={''}>
                            {placeholder || 'Choose Something'}
                        </StyledMenuItem>
                        {options.map((option, id) => (
                            <StyledMenuItem key={id} value={option.id}>
                                {option.name}
                            </StyledMenuItem>
                        ))}
                    </StyledSelect>
                )
            }}
        />
    ) : (
        <div style={{ position: 'relative' }}>
            <StyledSelect
                id="demo-simple-select-helper"
                value={value}
                displayEmpty
                onChange={onChange}
                borderRadius={borderRadius}
                border={border}
                background={background}
                padding={padding}
                width={width}
                height={height}
            >
                <StyledMenuItem disabled selected value="">
                    {placeholder || 'Choose'}
                </StyledMenuItem>
                {options.map((option) => (
                    <StyledMenuItem label={label} key={option.id} value={option.id}>
                        {option.name}
                    </StyledMenuItem>
                ))}
            </StyledSelect>
        </div>
    )
}
