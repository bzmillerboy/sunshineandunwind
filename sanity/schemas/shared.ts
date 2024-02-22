import React from 'react'

export const GrayBackgroundComponent = (props) => {
  return React.createElement(
    'span',
    {
      style: {
        backgroundColor: 'rgb(243, 244, 246)',
        padding: '.75rem',
        borderRadius: '5px',
      },
    },
    props.children,
  )
}
export const LeadComponent = (props) => {
  return React.createElement(
    'span',
    {
      style: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        color: 'rgb(120, 113, 108)',
      },
    },
    props.children,
  )
}

export const HighlightComponent = (props) => {
  return React.createElement(
    'span',
    {
      style: {
        padding: '.25rem',
        backgroundColor: 'rgb(254, 249, 195)',
      },
    },
    props.children,
  )
}
export const AlignLeftComponent = (props) => {
  return React.createElement(
    'span',
    {
      style: {
        textAlign: 'left',
        display: 'block',
      },
    },
    props.children,
  )
}

export const AlignCenterComponent = (props) => {
  return React.createElement(
    'span',
    {
      style: {
        textAlign: 'center',
        display: 'block',
      },
    },
    props.children,
  )
}

export const AlignRightComponent = (props) => {
  return React.createElement(
    'span',
    {
      style: {
        textAlign: 'right',
        display: 'block',
      },
    },
    props.children,
  )
}
